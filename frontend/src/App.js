import { useEffect, useMemo, useState } from "react";
import {
  fetchMeals,
  createMeal,
  updateMeal,
  deleteMeal,
  clearWeek
} from "./api";
import "./App.css";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const emptyMeal = {
  day: "",
  breakfast: "",
  lunch: "",
  dinner: "",
  snacks: "",
  notes: ""
};

function App() {
  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState(emptyMeal);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterDay, setFilterDay] = useState("All");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null
  });

  const orderedMeals = useMemo(() => {
    const sorted = meals
      .slice()
      .sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day));
    
    if (filterDay === "All") {
      return sorted;
    }
    return sorted.filter(meal => meal.day === filterDay);
  }, [meals, filterDay]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchMeals();
      setMeals(data);
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Validation function to check if value is purely numeric
  function isPurelyNumeric(value) {
    if (!value || typeof value !== 'string') return false;
    const trimmed = value.trim();
    // Check if value contains only numbers, spaces, commas, dots, or dashes
    // Reject if it's purely numeric (no letters or other characters)
    return trimmed.length > 0 && !/[^0-9\s,.-]/.test(trimmed);
  }

  function validateMealFields() {
    const mealFields = ['breakfast', 'lunch', 'dinner', 'snacks'];
    const errors = [];

    mealFields.forEach(field => {
      if (isPurelyNumeric(form[field])) {
        const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
        errors.push(`${fieldName} cannot be purely numeric. Please include text with your meal description.`);
      }
    });

    return errors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Frontend validation
    const validationErrors = validateMealFields();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(" "));
      setLoading(false);
      return;
    }

    try {
      if (!editingId) {
        await createMeal(form);
      } else {
        await updateMeal(editingId, form);
      }
      await load();
      setForm(emptyMeal);
      setEditingId(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(meal) {
    if (!meal._id) {
      setError("Cannot edit: Meal ID is missing");
      return;
    }
    setForm(meal);
    setEditingId(meal._id);
  }

  function cancelEdit() {
    setForm(emptyMeal);
    setEditingId(null);
    setError("");
  }

  function showDeleteConfirm(id, day) {
    setConfirmModal({
      show: true,
      title: "Delete Meal Plan",
      message: `Are you sure you want to delete the meal plan for ${day}? This action cannot be undone.`,
      onConfirm: async () => {
        setLoading(true);
        setError("");
        try {
          await deleteMeal(id);
          await load();
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
          setConfirmModal({ show: false, title: "", message: "", onConfirm: null });
        }
      }
    });
  }

  function showClearWeekConfirm() {
    setConfirmModal({
      show: true,
      title: "Clear Entire Week",
      message: "Are you sure you want to clear the entire week? This will delete all meal plans. This action cannot be undone.",
      onConfirm: async () => {
        setLoading(true);
        setError("");
        try {
          await clearWeek();
          await load();
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
          setConfirmModal({ show: false, title: "", message: "", onConfirm: null });
        }
      }
    });
  }

  function closeConfirmModal() {
    setConfirmModal({ show: false, title: "", message: "", onConfirm: null });
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>🍽️ Weekly Meal Planner</h1>
        <p>Plan your meals for the entire week</p>
      </div>

      {error && <div className="error-message">⚠️ {error}</div>}

      <div className="meal-form">
        <h2 className="form-title">
          {editingId ? "✏️ Edit Meal Plan" : "➕ Add New Meal Plan"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Day of the Week</label>
              <select
                name="day"
                value={form.day}
                onChange={handleChange}
                disabled={!!editingId}
                required
              >
                <option value="" disabled>
                  Select Day
                </option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>🌅 Breakfast</label>
              <input
                name="breakfast"
                value={form.breakfast}
                onChange={handleChange}
                placeholder="e.g., Oatmeal with fruits"
                required
                className={isPurelyNumeric(form.breakfast) ? "input-error" : ""}
              />
              {isPurelyNumeric(form.breakfast) && (
                <span className="field-error">Cannot be purely numeric</span>
              )}
            </div>

            <div className="form-group">
              <label>☀️ Lunch</label>
              <input
                name="lunch"
                value={form.lunch}
                onChange={handleChange}
                placeholder="e.g., Grilled chicken salad"
                required
                className={isPurelyNumeric(form.lunch) ? "input-error" : ""}
              />
              {isPurelyNumeric(form.lunch) && (
                <span className="field-error">Cannot be purely numeric</span>
              )}
            </div>

            <div className="form-group">
              <label>🌙 Dinner</label>
              <input
                name="dinner"
                value={form.dinner}
                onChange={handleChange}
                placeholder="e.g., Salmon with vegetables"
                required
                className={isPurelyNumeric(form.dinner) ? "input-error" : ""}
              />
              {isPurelyNumeric(form.dinner) && (
                <span className="field-error">Cannot be purely numeric</span>
              )}
            </div>

            <div className="form-group">
              <label>🍎 Snacks</label>
              <input
                name="snacks"
                value={form.snacks}
                onChange={handleChange}
                placeholder="e.g., Apple, nuts"
                required
                className={isPurelyNumeric(form.snacks) ? "input-error" : ""}
              />
              {isPurelyNumeric(form.snacks) && (
                <span className="field-error">Cannot be purely numeric</span>
              )}
            </div>

            <div className="form-group">
              <label>📝 Notes (Optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any additional notes or reminders..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {editingId ? "💾 Update Meal" : "➕ Add Meal"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelEdit}
                disabled={loading}
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="controls-section">
        <h2 className="section-title">📅 Weekly Meal Plan</h2>
        <div className="filter-controls">
          <button
            className={`filter-btn ${filterDay === "All" ? "active" : ""}`}
            onClick={() => setFilterDay("All")}
          >
            All Days
          </button>
          {days.map((day) => (
            <button
              key={day}
              className={`filter-btn ${filterDay === day ? "active" : ""}`}
              onClick={() => setFilterDay(day)}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {meals.length > 0 && (
        <div style={{ marginBottom: "15px", textAlign: "right" }}>
          <button
            className="btn btn-danger"
            onClick={showClearWeekConfirm}
            disabled={loading || meals.length === 0}
          >
            🗑️ Clear Entire Week
          </button>
        </div>
      )}

      {loading && <div className="loading">⏳ Loading meals...</div>}

      {!loading && orderedMeals.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🍽️</div>
          <h3>No meals added yet</h3>
          <p>
            {filterDay === "All"
              ? "Start planning your week by adding your first meal!"
              : `No meal plan found for ${filterDay}. Add one using the form above!`}
          </p>
        </div>
      )}

      {!loading && orderedMeals.length > 0 && (
        <div className="meals-grid">
          {orderedMeals.map((meal) => (
            <div key={meal._id} className="meal-card">
              <div className="meal-card-header">
                <h3 className="meal-day">{meal.day}</h3>
                <div className="meal-actions">
                  <button
                    className="btn btn-success btn-icon"
                    onClick={() => startEdit(meal)}
                    disabled={loading}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-danger btn-icon"
                    onClick={() => showDeleteConfirm(meal._id, meal.day)}
                    disabled={loading}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              <div className="meal-details">
                <div className="meal-item">
                  <span className="meal-label">🌅 Breakfast</span>
                  <span className="meal-value">{meal.breakfast}</span>
                </div>

                <div className="meal-item">
                  <span className="meal-label">☀️ Lunch</span>
                  <span className="meal-value">{meal.lunch}</span>
                </div>

                <div className="meal-item">
                  <span className="meal-label">🌙 Dinner</span>
                  <span className="meal-value">{meal.dinner}</span>
                </div>

                <div className="meal-item">
                  <span className="meal-label">🍎 Snacks</span>
                  <span className="meal-value">{meal.snacks || "Not specified"}</span>
                </div>

                {meal.notes && (
                  <div className="meal-item meal-notes">
                    <span className="meal-label">📝 Notes</span>
                    <span className="meal-value">{meal.notes}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.show && (
        <div className="modal-overlay" onClick={closeConfirmModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>⚠️ {confirmModal.title}</h3>
            </div>
            <div className="modal-body">
              <p>{confirmModal.message}</p>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={closeConfirmModal}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={confirmModal.onConfirm}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
