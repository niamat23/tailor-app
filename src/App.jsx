import React from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default function TailorMeasurementsApp() {
  const [clients, setClients] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [editingId, setEditingId] = React.useState(null);

  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    chest: "",
    chestHeight: "",
    waist: "",
    waistHeight: "",
    hips: "",
    shoulder: "",
    armLength: "",
    length: "",
    sleeve: "",
    price: "",
    notes: "",
  });

  // 🔵 Realtime Firebase
  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "clients"), (snapshot) => {
      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setClients(data);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔵 Add / Update
  const saveClient = async () => {
    if (!form.name.trim()) return;

    if (editingId) {
      await updateDoc(doc(db, "clients", editingId), form);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "clients"), form);
    }

    setForm({
      name: "",
      phone: "",
      chest: "",
      chestHeight: "",
      waist: "",
      waistHeight: "",
      hips: "",
      shoulder: "",
      armLength: "",
      length: "",
      sleeve: "",
      price: "",
      notes: "",
    });
  };

  // 🔵 Start edit
  const startEdit = (client) => {
    setForm(client);
    setEditingId(client.id);
  };

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100 p-4"
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto">

        {/* FORM */}
        <div className="bg-white/90 backdrop-blur rounded-[2rem] shadow-2xl border border-pink-200 p-6 mb-6">

          <h1 className="text-4xl font-extrabold mb-3 text-center text-rose-700">
            تطبيق وردة للخياطة والقياسات 🌸
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input name="name" value={form.name} onChange={handleChange} placeholder="اسم الزبونة" className="border p-3 rounded-xl" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="رقم الهاتف" className="border p-3 rounded-xl" />
            <input name="chest" value={form.chest} onChange={handleChange} placeholder="الصدر" className="border p-3 rounded-xl" />
            <input name="chestHeight" value={form.chestHeight} onChange={handleChange} placeholder="ارتفاع الصدر" className="border p-3 rounded-xl"/>
            <input name="waist" value={form.waist} onChange={handleChange} placeholder="الخصر" className="border p-3 rounded-xl" />
            <input name="waistHeight" value={form.waistHeight} onChange={handleChange} placeholder="ارتفاع الخصر" className="border p-3 rounded-xl"/>
            <input name="hips" value={form.hips} onChange={handleChange} placeholder="الورك" className="border p-3 rounded-xl" />
            <input name="shoulder" value={form.shoulder} onChange={handleChange} placeholder="الكتف" className="border p-3 rounded-xl" />
            <input name="armLength" value={form.armLength} onChange={handleChange} placeholder="طول الذراع" className="border p-3 rounded-xl" />
            <input name="length" value={form.length} onChange={handleChange} placeholder="الطول" className="border p-3 rounded-xl" />
            <input name="sleeve" value={form.sleeve} onChange={handleChange} placeholder="طول الكم" className="border p-3 rounded-xl" />
            <input name="price" value={form.price} onChange={handleChange} placeholder="الثمن" className="border p-3 rounded-xl" />

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="ملاحظات"
              className="border p-3 rounded-xl md:col-span-2"
            />

          </div>

          <button
            onClick={saveClient}
            className="mt-6 w-full bg-pink-500 text-white p-4 rounded-2xl font-bold"
          >
            {editingId ? "تحديث القياسات ✏️" : "حفظ القياسات"}
          </button>
        </div>

        {/* SEARCH */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث باسم الزبونة..."
          className="w-full p-3 mb-4 rounded-xl border"
        />

        {/* LIST */}
        <div className="space-y-4">

          {filteredClients.length === 0 ? (
            <div className="text-center text-gray-500">
              لا توجد قياسات محفوظة
            </div>
          ) : (

            filteredClients.map((client) => (
              <div key={client.id} className="bg-white p-4 rounded-2xl shadow">

                <div className="flex justify-between">
                  <div>
                      <h2 className="font-bold text-xl">{client.name}</h2>
                     <p>{client.phone}</p>

                      <div className="text-sm mt-2 space-y-1">
                        <p>الصدر: {client.chest || "🌷"}</p>
                        <p>ارتفاع الصدر: {client.chestHeight || "🌷"}</p>
                        <p>الخصر: {client.waist || "🌷"}</p>
                        <p>ارتفاع الخصر: {client.waistHeight || "🌷"}</p>
                        <p>الورك: {client.hips || "🌷"}</p>
                        <p>الكتف: {client.shoulder || "🌷"}</p>
                        <p>طول الذراع: {client.armLength || "🌷"}</p>
                        <p>الطول: {client.length || "🌷"}</p>
                        <p>الكم: {client.sleeve || "🌷"}</p>
                        <p>الثمن: {client.price || "🌷"}</p>

                       <div className="mt-3 p-2 bg-pink-50 rounded-lg border border-pink-200">
                               <strong>الملاحظات:</strong> {client.notes || "🌷"}
                         </div>
                       </div>
                      </div>

{/* زر التعديل فقط */}
                    <div className="flex flex-col gap-2">
                           <button
                                    onClick={() => startEdit(client)}
                                      className="bg-blue-500 text-white px-3 py-1 rounded-xl"
                                   >
                                تعديل ✏️
                             </button>
            </div>

                </div>

              </div>
            ))

          )}

        </div>

      </div>
    </div>
  );
}