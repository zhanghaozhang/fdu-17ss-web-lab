const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];

for (let i = 0; i < countries.length; i++){
    let div1 = document.createElement("div");
    div1.className = "item";

    let div0 = document.getElementsByClassName("flex-container justify")[0];
    div0.appendChild(div1);

    let h2 = document.createElement("h2");
    let node1 = document.createTextNode(countries[i].name);
    h2.appendChild(node1);
    div1.appendChild(h2);

    let p1 = document.createElement("p");
    let node2 = document.createTextNode(countries[i].continent);
    p1.appendChild(node2);
    div1.appendChild(p1);

    let div2 = document.createElement("div");
    div2.className = "inner-box";
    div1.appendChild(div2);

    let h3 = document.createElement("h3");
    let node3 = document.createTextNode("Cities");
    h3.appendChild(node3);
    div2.appendChild(h3);

    let ul = document.createElement("ul");
    for (let j = 0; j < countries[i].cities.length; j++){
        let li = document.createElement("li");
        let node4 = document.createTextNode(countries[i].cities[j]);
        li.appendChild(node4);
        ul.append(li);
    }
    div2.appendChild(ul);

    let div3 = document.createElement("div");
    div3.className = "inner-box";
    div1.appendChild(div3);

    let h4 = document.createElement("h3");
    let node4 = document.createTextNode("Popular Photos");
    h4.appendChild(node4);
    div3.appendChild(h4);

    let p = document.createElement("p");
    for (let j = 0; j < countries[i].photos.length; j++){
        let img = document.createElement("img");
        img.className = "photo";
        img.src="images/" +countries[i].photos[j];
        p.appendChild(img);
    }
    div3.appendChild(p);

    let button = document.createElement("button");
    let node6 = document.createTextNode("Visit");
    button.appendChild(node6);
    div1.appendChild(button);
}

