"use client";

import Link from "next/link";
import { useState } from "react";

export function BookTable() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    meridiem: "AM",
    guests: "2 Guests",
    location: "Banjara Hills",
    name: "",
    phone: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showTimeSelect, setShowTimeSelect] = useState(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowToast(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("tableReservation", JSON.stringify(formData));
    }
    setFormData({
      date: "",
      time: "",
      meridiem: "AM",
      guests: "2 Guests",
      location: "Banjara Hills",
      name: "",
      phone: ""
    });
    setShowTimeSelect(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <section className="container mx-auto px-6">
      <div className="grid gap-10 rounded-3xl bg-[#efe7d7] p-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b7d5a]">
            Book a Table
          </p>
          <h2 className="text-3xl font-bold text-[#2f3f2f]">
            Reserve your cozy corner in minutes
          </h2>
          <p className="text-[#58684f]">
            Plan a relaxed brunch or a quick coffee date. Choose your time, guests,
            and we’ll have a table ready for you.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-[#6c7a6a]">
            <span className="rounded-full border border-[#d7cfbf] bg-white px-3 py-1">Indoor & patio seating</span>
            <span className="rounded-full border border-[#d7cfbf] bg-white px-3 py-1">Same-day availability</span>
            <span className="rounded-full border border-[#d7cfbf] bg-white px-3 py-1">Family friendly</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-[#58684f]">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-[#d7cfbf] bg-[#fbf7ef] px-3 py-2 text-sm text-[#2f3f2f] focus:border-[#4f6b4f] focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#58684f]">Time</label>
                {showTimeSelect ? (
                  <div className="mt-1 grid grid-cols-[2fr_1fr] gap-2">
                    <select
                      name="time"
                      value={formData.time}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({ ...prev, time: value }));
                        if (value && formData.meridiem) setShowTimeSelect(false);
                      }}
                      required
                      className="w-full appearance-none rounded-lg border border-[#d7cfbf] bg-[#fbf7ef] px-3 py-2 pr-10 text-sm text-[#2f3f2f] focus:border-[#4f6b4f] focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
                    >
                      <option value="">Select time</option>
                      <option value="07:00">07:00</option>
                      <option value="07:30">07:30</option>
                      <option value="08:00">08:00</option>
                      <option value="08:30">08:30</option>
                      <option value="09:00">09:00</option>
                      <option value="09:30">09:30</option>
                      <option value="10:00">10:00</option>
                      <option value="10:30">10:30</option>
                      <option value="11:00">11:00</option>
                      <option value="11:30">11:30</option>
                      <option value="12:00">12:00</option>
                    </select>
                    <select
                      name="meridiem"
                      value={formData.meridiem}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({ ...prev, meridiem: value }));
                        if (formData.time && value) setShowTimeSelect(false);
                      }}
                      required
                      className="w-full appearance-none rounded-lg border border-[#d7cfbf] bg-[#fbf7ef] px-3 py-2  text-sm text-[#2f3f2f] focus:border-[#4f6b4f] focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
                    >
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center justify-between rounded-lg border border-[#d7cfbf] bg-[#fbf7ef] px-3 py-2 text-sm text-[#2f3f2f]">
                    <span>{formData.time} {formData.meridiem}</span>
                    <button
                      type="button"
                      onClick={() => setShowTimeSelect(true)}
                      className="text-xs font-semibold text-[#4f6b4f] hover:text-[#3f5a3f]"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-[#58684f]">Guests</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-[#d7cfbf] bg-[#fbf7ef] px-3 py-2 text-sm text-[#2f3f2f] focus:border-[#4f6b4f] focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5+ Guests</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-[#58684f]">Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-[#d7cfbf] bg-[#fbf7ef] px-3 py-2 text-sm text-[#2f3f2f] focus:border-[#4f6b4f] focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
                >
                  <option>Banjara Hills</option>
                  <option>Jubilee Hills</option>
                  <option>Gachibowli</option>
                </select>
              </div>
            </div>

            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#d7cfbf] bg-[#fbf7ef] px-3 py-2 text-sm text-[#2f3f2f] focus:border-[#4f6b4f] focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
            />
            <input
              type="tel"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#d7cfbf] bg-[#fbf7ef] px-3 py-2 text-sm text-[#2f3f2f] focus:border-[#4f6b4f] focus:outline-none focus:ring-2 focus:ring-[#4f6b4f]/30"
            />

            <button
              type="submit"
              className="mt-2 rounded-lg bg-[#4f6b4f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3f5a3f]"
            >
              Reserve Table
            </button>

            {submitted && (
              <p className="rounded-lg border border-[#d7cfbf] bg-[#fbf7ef] px-3 py-2 text-xs text-[#4f6b4f]">
                Reservation saved for {formData.guests.toLowerCase()} on {formData.date || "your chosen date"} at {formData.time ? `${formData.time} ${formData.meridiem}` : "your chosen time"} · {formData.location}.
              </p>
            )}

            {showToast && (
              <div className="rounded-lg border border-[#d7cfbf] bg-white px-3 py-2 text-xs font-semibold text-[#4f6b4f] shadow-sm">
                Reservation confirmed! We’ll see you soon.
              </div>
            )}

            <p className="text-xs text-[#6c7a6a]">
              Prefer to talk? <Link href="/contact" className="font-semibold text-[#4f6b4f] hover:text-[#3f5a3f]">Contact us</Link> and we’ll book it for you.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
