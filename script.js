const pages = {
    home: `<h1>Patch Notes</h1>`,
    download: `<h1>Download</h1><p>It's not out yet but it'll be available for Windows and Linux. I don't have any plans to ever release this game for MacOS.</p>`,
    about: `<h1>About</h1><p>Generic survival sandbox. </br>Forage, craft, explore, build, gather, manufacture, trade, claim, expand, make alliances, wage wars, conquer.</p>
    <p>Reldawin is permadeath. Permadeath can be bullshit. To make it not suck items are common and recipes don't ask for much. But make no mistake, your skills and equipment condition will massively improve your odds at surviving winters, wars and wilderness.`,
    support: `<h1>Support</h1><p>Found a bug? Email me at Lojith@Reldawin.com.</br>I don't use social media, so. No links to share.</p>`
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
