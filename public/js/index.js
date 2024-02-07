const form = document.querySelector("form");
const input = document.querySelector("#url");
const text = document.querySelector(".copy");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("/url", {
            method: "POST",
            body: JSON.stringify({
                url: input.value,
            }),
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((response) => response.text())
        .then((result) => {
            console.log("Success:", result);
            text.innerHTML = `<div class="d-flex align-items-center bg-dark px-5 text-light rounded">
                                <p class="mb-0 mr-1 cpy-text">${result}</p>
                                </div>
                                ${result !== "invalid input" ? `<button class="btn btn-warning mx-auto mx-md-0 mt-1 mt-md-0 d-block cpy-btn">
                                copy
                                </button>` : ""}
                                `;
            const cpyText = document.querySelector('.cpy-text');
            const cpyBtn = document.querySelector('.cpy-btn');
            cpyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(cpyText.innerText);
                alert("Copied to Clipboard");
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    input.value = "";
});