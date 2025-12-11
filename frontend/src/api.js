const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function fetchMeals() {
  const res = await fetch(`${API_BASE}/meals`);
  if (!res.ok) throw new Error("Failed to load meals");
  return res.json();
}

export async function createMeal(payload) {
  const res = await fetch(`${API_BASE}/meals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error((await res.json()).error || "Create failed");
  return res.json();
}

export async function updateMeal(id, payload) {
  if (!id) {
    throw new Error("Meal ID is required for update");
  }
  
  const url = `${API_BASE}/meals/${id}`;
  console.log("Updating meal - URL:", url);
  console.log("Updating meal - ID:", id);
  console.log("Updating meal - Payload:", payload);
  
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  
  console.log("Update response status:", res.status);
  
  if (!res.ok) {
    let errorMessage = "Update failed";
    try {
      const error = await res.json();
      errorMessage = error.error || errorMessage;
      console.error("Update error:", error);
    } catch (e) {
      errorMessage = `Server error: ${res.status} ${res.statusText}`;
      console.error("Failed to parse error response:", e);
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

export async function deleteMeal(id) {
  const res = await fetch(`${API_BASE}/meals/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Delete failed");
  }
  return res.json();
}

export async function clearWeek() {
  const res = await fetch(`${API_BASE}/meals`, { method: "DELETE" });
  if (!res.ok) throw new Error("Clear failed");
  return res.json();
}

