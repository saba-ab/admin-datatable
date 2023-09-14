const url = "https://jsonplaceholder.typicode.com/users";
const getUsers = new Promise((res, rej) => {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      res(data);
    })
    .catch((err) => {
      rej(err);
    });
});
const container = document.createElement("div");
container.style.display = "flex";
container.style.padding = "5%";
container.style.flexDirection = "column";
container.style.textAlign = "center";
document.body.appendChild(container);
const tableHeader = document.createElement("div");
tableHeader.classList = "header";
tableHeader.innerHTML = `<p>image</p> <p>name</p> <p>username</p> <p>email</p> <p>address</p>`;
tableHeader.style.display = "flex";
tableHeader.style.justifyContent = "space-between";
tableHeader.style.fontSize = "22px";
container.appendChild(tableHeader);
function createColumn(title, width, content) {
  const div = document.createElement("div");
  div.style.width = width;
  div.classList.add(title);
  if (div.className === "image") {
    const img = document.createElement("img");
    div.appendChild(img);
    img.style.width = "36px";
    img.setAttribute("src", content);
    div.style.objectFit = "cover";
  } else {
    div.innerHTML = content;
    div.style.display = "flex";
    div.style.textAlign = "center";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
  }
  return div;
}
const rows = [];
getUsers
  .then((users) => {
    function createRow() {
      users.forEach((user) => {
        const row = document.createElement("div");
        row.classList.add("row");
        row.style.display = "flex";
        row.style.width = "100%";
        row.style.padding = "5px";
        row.style.color = "rgb(0, 0, 0, 0.5)";
        row.style.fontSize = "14px";
        row.style.borderBottom = "1px solid rgb(0, 0, 0, 0.5)";
        row.appendChild(
          createColumn("image", "50px", `./media/${user.id}.svg`)
        );
        row.appendChild(createColumn(`name`, "35%", `${user.name}`));
        row.appendChild(createColumn(`surname`, "25%", `${user.username}`));
        row.appendChild(createColumn(`email`, "20%", `${user.email}`));
        row.appendChild(
          createColumn(`address`, "calc(20% - 50px)", `${user.address.street}`)
        );
        rows.push(row);
        return rows;
      });
    }
    createRow();
    rows.forEach((row) => {
      container.appendChild(row);
      row.addEventListener("mouseover", () => {
        row.style.backgroundColor = "rgb(0, 0, 0, 0.2)";
      });
      row.addEventListener("mouseout", () => {
        row.style.backgroundColor = "rgb(0, 0, 0, 0)";
      });
    });
  })
  .catch((err) => {
    console.error("Error", err);
  });
// const streetrow = rows.splice(0, 3);
// const street = streetrow;
// console.log(streetrow);
// function createRow(image, nameText, usernameText, emailText, streetText) {
//   const row = document.createElement("div");
//   row.classList.add("row");
//   row.style.display = "flex";
//   row.style.width = "100%";
//   row.style.justifyContent = "space-between";
//   row.style.padding = "5px";
//   row.style.color = "rgb(0, 0, 0, 0.5)";
//   row.style.fontSize = "14px";
//   row.style.borderBottom = "1px solid rgb(0, 0, 0, 0.5)";
//   const nameDiv = document.createElement("div");
//   nameDiv.style.textAlign = "start";
//   nameDiv.style.width = "30%";
//   const usernameDiv = document.createElement("div");
//   usernameDiv.style.width = "25%";
//   const emailDiv = document.createElement("div");
//   emailDiv.style.width = "25%";
//   const streetDiv = document.createElement("div");
//   streetDiv.style.width = "20%";
//   streetDiv.style.textAlign = "end";
//   const name = document.createElement("p");
//   const username = document.createElement("p");
//   const email = document.createElement("p");
//   const street = document.createElement("p");
//   name.textContent = nameText;
//   username.textContent = usernameText;
//   email.textContent = emailText;
//   street.textContent = streetText;
//   nameDiv.appendChild(name);
//   usernameDiv.appendChild(username);
//   emailDiv.appendChild(email);
//   streetDiv.appendChild(street);
//   const imageDiv = createColumn("image", "50px", `./media/1.svg`);
//   row.appendChild(imageDiv);
//   row.appendChild(nameDiv);
//   row.appendChild(usernameDiv);
//   row.appendChild(emailDiv);
//   row.appendChild(streetDiv);
//   const allRows = container.querySelectorAll(".row");
//   allRows.forEach((row) => {
//     row.addEventListener("mouseover", () => {
//       row.style.backgroundColor = "rgb(0, 0, 0, 0.2)";
//     });
//     row.addEventListener("mouseout", () => {
//       row.style.backgroundColor = "rgb(0, 0, 0, 0)";
//     });
//   });
//   return row;
// }
// document.body.appendChild(container);
// container.appendChild(createRow("Name", "Username", "Email", "Street"));
// getUsers
//   .then((res) => {
//     res.forEach((user) => {
//       container.appendChild(
//         createRow(
//           createColumn("image", "50px", `./media/${user.id}.svg`),
//           user.name,
//           user.username,
//           user.email,
//           user.address.street
//         )
//       );
//     });
//   })
//   .catch((err) => {
//     console.error("Error - ", err);
//   });
// const tableHeader = container.querySelector(":first-child");
// tableHeader.style.fontSize = "20px";
// tableHeader.style.color = "black";
