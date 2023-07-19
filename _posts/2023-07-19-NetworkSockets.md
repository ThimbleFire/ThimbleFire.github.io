---
titles: Network Sockets
date: 2023-07-19 01:27:35 -0
categories: [c#,unity,reldawin]  # TAG names should always be lowercase
tags: [c#,unity,networking,socket]
---

I've been playing a lot of Project Zomboid lately and it's gotten me wanting to work on my isometric game that I started a few years back. Thought I'd start by looking at the server and client code and document it here. This excludes error handling to improve readability.

### ReldawinServerMaster
```c#
internal class Program {
    private static void Main (string[] args ) => StartServer();
    private static void StartServer() {
        // Connect to XAMP 
        SQLReader.Setup();
        // Ensure mandatory database tables exist, create and populate if not 
        SQLReader.IntegrityCheck();
        // Preload tile, object and item information
        XMLDevice.Setup();
        // Fetch map data from database and build the world
        World.Setup();
        // Initialize a dictionary with network package IDs and their corrosponding actions
        ServerHandleNetworkData.InitializeNetworkPackages();
        // Initialize the client list and listen for incoming network packets
        ServerTCP.SetupServer();
    }
}
```
### Reldawin Unity
```c#
public class ClientTCP : MonoBehaviour {
    public static Socket clientSocket = new Socket( AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp );
    private void Awake() {
        DontDestroyOnLoad(gameObject);
        DontDestroyOnLoad(this);
    }
    private void Start() => Connect();
    // User launches game client
    public void Connect() {
        clientSocket.BeginConnect("127.0.0.1", 5555, new AsyncCallback( ConnectCallback ), clientSocket);
    }
}
```

### ReldawinServerMaster
```c#
internal class ServerTCP {
    private static void AcceptCallback( IAsyncResult ar ) {
        Socket socket = serverSocket.EndAccept( ar );
        serverSocket.BeginAccept( new AsyncCallback( AcceptCallback ), null );
        for ( int i = 0; i < Log.MAX_PLAYERS; i++ ) {
            if ( clients[i].socket == null ) {
                clients[i].socket = socket;
                clients[i].index = i;
                clients[i].ip = socket.RemoteEndPoint.ToString();
                clients[i].StartClient();
                Console.WriteLine( "[ServerTCP] " + Log.SERVER_LOBBY_JOIN, i );
                SendConnectionOK( i );
                return;
            }
        }
    }
    public static void SendConnectionOK( int index ) {
        using ( new DebugTimer( "SendConnectionOK" ) ) {
            using ( PacketBuffer buffer = new PacketBuffer(Packet.ConnectionOK) ) {
                SendDataTo( index, buffer.ToArray() );
                Console.WriteLine( "[ServerTCP] " + "Send ConnectionOK" );
            }
        }
    }
}
```

### Reldawin Unity
```c#
public class ClientTCP : MonoBehaviour {
    public static void OnRecieve() {
        byte[] sizeInfo = new byte[4];
        while (totalRead < sizeInfo.Length && currentRead > 0) {
            currentRead = clientSocket.Receive(sizeInfo, totalRead, sizeInfo.Length - totalRead, SocketFlags.None);
            totalRead += currentRead;
        }
        int messageSize = 0;
        messageSize |= sizeInfo[0];
        messageSize |= ( sizeInfo[1] << 08 );
        messageSize |= ( sizeInfo[2] << 16 );
        messageSize |= ( sizeInfo[3] << 24 );
        byte[] data = new byte[messageSize];
        totalRead = 0;
        currentRead = totalRead = clientSocket.Receive(data, totalRead, data.Length - totalRead, socketFlags.None);
        while (totalRead < messageSize && currentRead > 0) {
            currentRead = clientSocket.Receive(data, totalRead, sizeInfo.Length - totalRead, SocketFlags.None);
            totalRead += totalRead;
        }
        ClientHandleNetworkPackets.HandleNetworkInformation( data );
    }
}
internal class ClientHandleNetworkPackets : MonoBehaviour {
    public static void HandleNetworkInformation( byte[] data ) {
        using PacketBuffer buffer = new PacketBuffer( data );
        int packetNum = buffer.ReadInteger();
        if ( packets.TryGetValue( packetNum, out Packet_ packet ) ) {
            packet.Invoke( data );
        }
    }
    private static void HandleConnectionOK( byte[] data ) {
        using PacketBuffer buffer = new PacketBuffer( data );
        int cpIndex = buffer.ReadInteger();
        ClientTCP.SendConfirmRecieve();
        // The network client can't interfere with the main thread so network events are passed to an event queue until fired during the next Update call.
        eventProcessor.QueueEvent( (Packet)cpIndex );
    }
}
public class EventProcessor : MonoBehaviour {
    private void Update() {
        MoveQueuedEventsToExecuting();
        if ( m_executingEvents.Count > 0 ) {
            Packet action = m_executingEvents[0];
            object[] p = m_executingParams[0];
            m_executingEvents.RemoveAt( 0 );
            m_executingParams.RemoveAt( 0 );
            if ( instructionParams.ContainsKey( action ) ) {
                instructionParams[action].Invoke( p );
            }
            else {
                Debug.LogError( string.Format( "No instruction for {0}.", action ) );
            }
        }
    }
}
internal class ClientTCP : MonoBehaviour {
    public static void SendConfirmRecieve() {
        using PacketBuffer buffer = new PacketBuffer( Packet.ConnectionOK );
        SendData( buffer.ToArray() );
    }
}
```

### ReldawinServerMaster
```c#
internal class HandleNetworkData {
    private static void HandleOnUserConnect( int index, PacketBuffer buffer ) {
        Console.WriteLine( "[ServerHandleNetworkData][HandleOnUserConnect] " );
    }
}
```
