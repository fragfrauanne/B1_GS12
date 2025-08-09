const tasks = [
    { question: "_____ sie alle Prüfungen geschrieben hatte, beka, sie ihr Diplom.", answer: "Nachdem" },
    { question: "_____ ich zur Arbeit gehe, frühstücke ich.", answer: "Bevor" },
    { question: "Mit dem Essen warten wir noch, _____ alle Gäste da sind.", answer: "bis" },
    { question: "_____ er einen Deutschkurs besucht, versteht er die Leute viel besser.", answer: "Seit(dem)" },
    { question: "_____ Opa schläft, sollten wir ihn nicht stören.", answer: "Während" },
    { question: "_____ ich aus dem Haus gehe, kämme ich noch schnell meine Haare.", answer: "Bevor" },
    { question: "_____ er operiert wird, muss seine Frau auf dem Gang warten.", answer: "Während" },
    { question: "Ich suche so lange, _____ ich die Brille finde.", answer: "bis" },
    { question: "_____ das Baby gegessen hat, macht es einen Mittagsschlaf.", answer: "Nachdem" },
    { question: "Könntest du bitte auf das Baby aufpassen, _____ ich einkaufen gehe?", answer: "während" },
    { question: "_____ Sie unterschreiben, sollten Sie alles genau lesen.", answer: "Bevor" },
    { question: "Warte bitte, _____ ich fertig bin, dann kann ich dir helfen.", answer: "bis" },
    { question: "_____ du den Apfel isst, solltest du ihn waschen.", answer: "Bevor" },
    { question: "_____ ich ihm antworte, muss ich mir alles genau überlegen.", answer: "Bevor" },
    { question: "_____ ich die schlechte Nachricht gehört hatte, war ich sehr traurig.", answer: "Nachdem" },
    { question: "_____ Sie nach Algerien reisen, müssen Sie ein Visum beantragen.", answer: "Bevor" },
    { question: "_____ ich sie kenne, ist mein Leben viel schöner.", answer: "Seit(dem)" },
    { question: "_____ wir eine größere Wohnung haben, streiten wir viel weniger.", answer: "Seit(dem)" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);