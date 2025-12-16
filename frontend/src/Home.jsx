import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Attendee registered:", data);
        alert("Attendee registered successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          gender: "",
          age: "",
          weight: "",
          height: "",
        }); //reset form
      }
    } catch (error) {
      console.error("Error registering attendee:", error);
      alert("Failed to register attendee.");
    }
  };

  return (
    <div className="App">
      <div>
        <h2>Event Registration</h2>
        <form class="inputBox" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
            required
          />
          <input
            placeholder="Last Name"
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
            required
          />
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="AH">Attack Helicopter</option>
          </select>
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
            required
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: parseInt(e.target.value) })
            }
            required
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={(e) =>
              setFormData({ ...formData, height: parseInt(e.target.value) })
            }
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
