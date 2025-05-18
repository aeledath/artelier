
import React, { useState, useEffect } from "react";

export default function Home() {
  const [artworks, setArtworks] = useState([]);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    fetch("/data/artworks.json")
      .then(res => res.json())
      .then(data => setArtworks(data));
  }, []);

  const sorted = [...artworks].sort((a, b) => {
    if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    return a[sortBy].localeCompare(b[sortBy]);
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Artelier</h1>
      <p style={{ textAlign: "center" }}>A showcase of original artwork</p>
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="date">Date</option>
        <option value="medium">Medium</option>
        <option value="category">Category</option>
      </select>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {sorted.map(art => (
          <div key={art.id} style={{ border: "1px solid #ccc", padding: "10px", width: "300px" }}>
            <img src={art.imageUrl} alt={art.title} style={{ width: "100%" }} />
            <h2>{art.title}</h2>
            <p>{art.medium} – {art.category}</p>
            <p>{new Date(art.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
