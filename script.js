const pages = {
    home: `<h1>Patch Notes</h1>`,
    play: `lol jk`,
    about: `<h1>About</h1><p>Reldawin is a permadeath survival MMO that runs in the browser.</p><p>In Reldawin characters do not have names. In place of a friends list there is an acquaintance list where characters can be added and given names and colour flags.</p>`,
    support: `<h1>Contact</h1><p>Found a bug? IDK how when the game isn't out yet. Time travellers can email me at Lojith@Reldawin.com.</p>`
};

async function loadPatchNotes() {
  const container = document.getElementById('page-content');
  container.innerHTML = "<h1>Patch Notes</h1>";

  const manifest = await fetch("manifest.json").then(r => r.json());

  for (const file of manifest.patches) {
    const data = await fetch("patchnotes/" + file).then(r => r.json());
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.innerHTML = `<b>${data.version}</b>`;
    details.appendChild(summary);

    for (const section of data.sections) {
      const h2 = document.createElement("h2");
      h2.textContent = section.title;
      details.appendChild(h2);

      if (Array.isArray(section.images)) {
        for (const src of section.images) {
          const img = document.createElement("img");
          img.src = src;          // relative or absolute URL
          img.style.maxWidth = "100%";      // responsive
          img.style.margin = "10px auto";
          img.style.paddingRight = "20px";
          details.appendChild(img);
        }
      }

      if (section.vid) {
        const video = document.createElement("video");
        video.src = section.vid;
        video.controls = true;
        video.autoplay = false; // change to true if you want autoplay
        video.loop = true;
        video.muted = true;     // helps if you enable autoplay
        video.style.display = "block";
        video.style.margin = "20px auto";
        video.style.maxWidth = "100%";
        details.appendChild(video);
      }

      const ul = document.createElement("ul");
      for (const item of section.items) {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      }
      details.appendChild(ul);
    }

    container.appendChild(details);
  }
}

function showPage(page) {
    if (page === "home") {
        loadPatchNotes();
    }
    else {
        document.getElementById('page-content').innerHTML = pages[page];
    }
}

window.onload = function() {
    showPage('home');
};
