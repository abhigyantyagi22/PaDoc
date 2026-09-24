import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import "./styles.css";
import "./pharmacy.css";
import { additionalMedicines } from "./additionalMedicines";

type Role = "user" | "doctor";
type View = "overview" | "discover" | "appointments" | "pharmacy" | "settings";
type Doctor = {
  id: string;
  uid?: string;
  name?: string;
  speciality?: string;
  email?: string;
};
type Appointment = {
  id: string;
  doctorName?: string;
  patientId?: string;
  doctorId?: string;
  date?: string;
  status?: string;
};
type CartItem = { name: string; price: string; quantity: number };
type PharmacyOrder = {
  id: string;
  items?: CartItem[];
  total?: number;
  status?: string;
  createdAt?: string;
};

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const configured = Object.values(config).every(
  (value) => value && !value.includes("replace-me"),
);
const firebaseApp = configured ? initializeApp(config) : null;
const auth = firebaseApp ? getAuth(firebaseApp) : null;
const db = firebaseApp ? getFirestore(firebaseApp) : null;

function Button({
  children,
  onClick,
  secondary = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={secondary ? "button button-secondary" : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Auth({
  onRole,
  onClose,
}: {
  onRole: (role: Role) => void;
  onClose?: () => void;
}) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<Role>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!auth || !db) return;
    setBusy(true);
    setMessage("");
    try {
      const result =
        mode === "login"
          ? await signInWithEmailAndPassword(auth, email, password)
          : await createUserWithEmailAndPassword(auth, email, password);
      if (mode === "signup")
        await setDoc(
          doc(db, role === "doctor" ? "doctors" : "users", result.user.uid),
          {
            uid: result.user.uid,
            name,
            email,
            role,
            createdAt: new Date().toISOString(),
          },
        );
      onRole(role);
    } catch (error: any) {
      setMessage(error.message ?? "Authentication failed.");
    } finally {
      setBusy(false);
    }
  };
  const reset = async () => {
    if (!auth || !email) return setMessage("Enter your email first.");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent.");
    } catch (error: any) {
      setMessage(error.message);
    }
  };
  return (
    <main className="auth-layout">
      <section className="auth-art">
        <div className="brand">
          Pa<span>Doc</span>
        </div>
        <div className="art-copy">
          <p className="eyebrow">CARE, CONNECTED</p>
          <h1>Better care begins with a clear next step.</h1>
          <p>
            Find trusted doctors, request appointments, and keep your health
            journey in one calm place.
          </p>
        </div>
      </section>
      <section className="auth-panel">
        {onClose && (
          <button
            className="close-auth"
            onClick={onClose}
            aria-label="Close sign in"
          >
            ×
          </button>
        )}
        <p className="eyebrow">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </p>
        <h2>{mode === "login" ? "Sign in to PaDoc" : "Join your care team"}</h2>
        <p className="muted">
          {mode === "login"
            ? "Your appointments are waiting."
            : "A simpler way to care for people."}
        </p>
        <div className="segmented">
          <button
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            Patient
          </button>
          <button
            className={role === "doctor" ? "active" : ""}
            onClick={() => setRole("doctor")}
          >
            Doctor
          </button>
        </div>
        <form onSubmit={submit}>
          {mode === "signup" && (
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
            />
          )}
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
          />
          <input
            required
            minLength={6}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
          {mode === "login" && (
            <button className="text-button" type="button" onClick={reset}>
              Forgot password?
            </button>
          )}
          {message && <p className="form-message">{message}</p>}
          <Button type="submit">
            {busy
              ? "Please wait..."
              : mode === "login"
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>
        <button
          className="switch"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "New to PaDoc? Create an account"
            : "Already have an account? Sign in"}
        </button>
      </section>
    </main>
  );
}

function SetupNotice() {
  return (
    <main className="setup">
      <div className="brand">
        Pa<span>Doc</span>
      </div>
      <div className="setup-card">
        <p className="eyebrow">One step left</p>
        <h1>Connect your Firebase project.</h1>
        <p>
          Add the values from your new Firebase web app to a local{" "}
          <code>.env</code> file using the names in <code>.env.example</code>,
          then restart the development server.
        </p>
        <Button onClick={() => window.location.reload()}>
          Check configuration
        </Button>
      </div>
    </main>
  );
}

function Sidebar({
  view,
  setView,
  role,
  user,
  onSignOut,
  onRequireAuth,
}: {
  view: View;
  setView: (view: View) => void;
  role: Role;
  user: User | null;
  onSignOut?: () => void;
  onRequireAuth: () => void;
}) {
  const items: [View, string, string][] =
    role === "doctor"
      ? [
          ["overview", "Overview", "⌂"],
          ["appointments", "Patients", "□"],
          ["pharmacy", "Pharmacy", "＋"],
          ["settings", "Settings", "⚙"],
        ]
      : [
          ["overview", "Overview", "⌂"],
          ["discover", "Find a doctor", "＋"],
          ["appointments", "Appointments", "□"],
          ["pharmacy", "Pharmacy", "＋"],
          ["settings", "Settings", "⚙"],
        ];
  return (
    <aside className="sidebar">
      <div className="brand">
        Pa<span>Doc</span>
      </div>
      <div className="profile-mini">
        <div className="avatar">{(user?.email?.[0] ?? "G").toUpperCase()}</div>
        <div>
          <strong>
            {user
              ? role === "doctor"
                ? "Doctor workspace"
                : "Patient account"
              : "Guest browsing"}
          </strong>
          <small>{user?.email ?? "Explore care without an account"}</small>
        </div>
      </div>
      <nav>
        {items.map(([key, label, icon]) => (
          <button
            key={key}
            className={view === key ? "nav-active" : ""}
            onClick={() =>
              user ||
              key === "overview" ||
              key === "discover" ||
              key === "pharmacy"
                ? setView(key)
                : onRequireAuth()
            }
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </nav>
      {user ? (
        <button className="signout" onClick={onSignOut}>
          Sign out <span>↗</span>
        </button>
      ) : (
        <button className="signout guest-login" onClick={onRequireAuth}>
          Sign in <span>↗</span>
        </button>
      )}
    </aside>
  );
}

function Topbar({
  title,
  user,
  onRequireAuth,
}: {
  title: string;
  user: User | null;
  onRequireAuth: () => void;
}) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1>{title}</h1>
      </div>
      <div className="top-user">
        {!user && (
          <button className="top-login" onClick={onRequireAuth}>
            Sign in
          </button>
        )}
        <span className="notification">○</span>
        <div className="avatar">{(user?.email?.[0] ?? "G").toUpperCase()}</div>
      </div>
    </header>
  );
}

function Overview({
  role,
  user,
  setView,
  onRequireAuth,
}: {
  role: Role;
  user: User | null;
  setView: (view: View) => void;
  onRequireAuth: () => void;
}) {
  const protectedView = (view: View) =>
    user ? setView(view) : onRequireAuth();
  return (
    <>
      <div className="welcome-band">
        <div>
          <p className="eyebrow">
            {user
              ? role === "doctor"
                ? "Your practice"
                : "Your health journey"
              : "Open care marketplace"}
          </p>
          <h2>
            {user
              ? role === "doctor"
                ? "Ready for your next patient?"
                : `Good to see you, ${user.email?.split("@")[0] ?? "there"}.`
              : "Find care before you commit."}
          </h2>
          <p>
            {user
              ? role === "doctor"
                ? "Keep your schedule and patient requests moving."
                : "Find the right specialist and make your next appointment count."
              : "Browse trusted specialists, explore your options, then sign in only when you are ready to book."}
          </p>
          <Button
            onClick={() =>
              setView(role === "doctor" ? "appointments" : "discover")
            }
          >
            {role === "doctor" ? "View patient requests" : "Browse doctors"}{" "}
            <span>→</span>
          </Button>
        </div>
        <img src="/assets/images/img_welcome.png" alt="Care illustration" />
      </div>
      <div className="stats">
        <article>
          <span className="stat-icon green">✦</span>
          <div>
            <strong>Browse freely</strong>
            <p>Explore doctors without an account</p>
          </div>
        </article>
        <article>
          <span className="stat-icon peach">□</span>
          <div>
            <strong>Book when ready</strong>
            <p>Sign in only for protected actions</p>
          </div>
        </article>
        <article>
          <span className="stat-icon blue">✓</span>
          <div>
            <strong>Secure account</strong>
            <p>Your details stay protected</p>
          </div>
        </article>
      </div>
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Quick access</p>
            <h2>What would you like to do?</h2>
          </div>
        </div>
        <div className="action-grid">
          <button onClick={() => setView("discover")}>
            <span>＋</span>
            <strong>Explore doctors</strong>
            <small>Compare specialties and profiles</small>
          </button>
          <button onClick={() => protectedView("appointments")}>
            <span>□</span>
            <strong>
              {user ? "View appointments" : "Book an appointment"}
            </strong>
            <small>
              {user ? "See what is coming up" : "Sign in when you are ready"}
            </small>
          </button>
        </div>
      </section>
    </>
  );
}

function Doctors({ onBook }: { onBook: (doctor: Doctor) => void }) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [term, setTerm] = useState("");
  useEffect(
    () =>
      db
        ? onSnapshot(
            collection(db, "doctors"),
            (snapshot) =>
              setDoctors(
                snapshot.docs.map(
                  (item) => ({ id: item.id, ...item.data() }) as Doctor,
                ),
              ),
            () => setDoctors([]),
          )
        : undefined,
    [],
  );
  const filtered = useMemo(
    () =>
      doctors.filter((doctor) =>
        `${doctor.name ?? ""} ${doctor.speciality ?? ""}`
          .toLowerCase()
          .includes(term.toLowerCase()),
      ),
    [doctors, term],
  );
  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Specialists</p>
          <h2>Find the right doctor</h2>
        </div>
        <input
          className="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search name or speciality"
        />
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          Doctors added to your Firebase project will appear here.
        </div>
      ) : (
        <div className="doctor-grid">
          {filtered.map((doctor) => (
            <article className="doctor-card" key={doctor.id}>
              <div className="doctor-avatar">
                {(doctor.name?.[0] ?? "D").toUpperCase()}
              </div>
              <div>
                <h3>{doctor.name ?? "Medical specialist"}</h3>
                <p>{doctor.speciality ?? "General medicine"}</p>
                <button className="card-link" onClick={() => onBook(doctor)}>
                  Request appointment →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Appointments({ role, user }: { role: Role; user: User }) {
  const [items, setItems] = useState<Appointment[]>([]);
  useEffect(() => {
    if (!db || !user) return;
    const appointmentQuery =
      role === "doctor"
        ? query(
            collection(db, "appointments"),
            where("doctorId", "==", user.uid),
          )
        : query(
            collection(db, "appointments"),
            where("patientId", "==", user.uid),
          );
    return onSnapshot(appointmentQuery, (snapshot) =>
      setItems(
        snapshot.docs.map(
          (item) => ({ id: item.id, ...item.data() }) as Appointment,
        ),
      ),
    );
  }, [role, user]);
  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your care plan</p>
          <h2>
            {role === "doctor" ? "Patient requests" : "Upcoming appointments"}
          </h2>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          No appointments yet. Your next step will appear here.
        </div>
      ) : (
        <div className="appointment-list">
          {items.map((item) => (
            <article key={item.id}>
              <div className="date-tile">{item.date?.slice(0, 2) ?? "--"}</div>
              <div>
                <h3>{item.doctorName ?? "Appointment request"}</h3>
                <p>
                  {item.date ?? "To be scheduled"} · {item.status ?? "Pending"}
                </p>
              </div>
              <span className="status">{item.status ?? "Pending"}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Settings({ onSignOut }: { onSignOut: () => void }) {
  return (
    <section className="content-section">
      <p className="eyebrow">Account</p>
      <h2>Settings</h2>
      <div className="settings-card">
        <h3>Your account is connected</h3>
        <p>Manage your PaDoc session and Firebase account.</p>
        <Button secondary onClick={onSignOut}>
          Sign out
        </Button>
      </div>
    </section>
  );
}

function Dashboard({
  user,
  role,
  onSignOut,
  onRequireAuth,
}: {
  user: User | null;
  role: Role;
  onSignOut?: () => void;
  onRequireAuth: () => void;
}) {
  const [view, setView] = useState<View>("overview");
  const title =
    view === "overview"
      ? "Overview"
      : view === "discover"
        ? "Find a doctor"
        : view === "appointments"
          ? "Appointments"
          : view === "pharmacy"
            ? "Pharmacy"
            : "Settings";
  const navigate = (nextView: View) => {
    if (!user && (nextView === "appointments" || nextView === "settings"))
      return onRequireAuth();
    setView(nextView);
  };
  const book = async (doctor: Doctor) => {
    if (!user) return onRequireAuth();
    if (!db) return;
    await addDoc(collection(db, "appointments"), {
      patientId: user.uid,
      doctorId: doctor.uid ?? doctor.id,
      doctorName: doctor.name ?? "Medical specialist",
      date: "To be scheduled",
      status: "Pending",
      createdAt: new Date().toISOString(),
    });
    setView("appointments");
  };
  return (
    <div className="app-shell">
      <Sidebar
        view={view}
        setView={navigate}
        role={role}
        user={user}
        onSignOut={onSignOut}
        onRequireAuth={onRequireAuth}
      />
      <main className="main">
        <Topbar title={title} user={user} onRequireAuth={onRequireAuth} />
        {view === "overview" && (
          <Overview
            role={role}
            user={user}
            setView={navigate}
            onRequireAuth={onRequireAuth}
          />
        )}
        {view === "discover" && <Doctors onBook={book} />}
        {view === "appointments" && user && (
          <Appointments role={role} user={user} />
        )}
        {view === "pharmacy" && (
          <Pharmacy user={user} onRequireAuth={onRequireAuth} />
        )}
        {view === "settings" && user && <Settings onSignOut={onSignOut!} />}
      </main>
    </div>
  );
}

function Pharmacy({
  user,
  onRequireAuth,
}: {
  user: User | null;
  onRequireAuth: () => void;
}) {
  const categories = [
    "All medicines",
    "Pain relief",
    "Cold & allergy",
    "Digestive health",
    "Vitamins",
    "First aid",
  ];
  const products = [
    ...additionalMedicines,
    {
      name: "Paracetamol 500mg",
      detail: "Everyday pain and fever relief",
      price: "$6.50",
      tone: "peach",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80",
      categories: ["Pain relief", "Cold & allergy"],
      description:
        "A common non-prescription medicine for temporary relief of mild to moderate pain and fever.",
      take: "Take with water exactly as directed on the pack. Do not exceed the stated daily dose.",
      when: "Usually taken when symptoms appear, with the interval and maximum dose shown on the label.",
      pros: ["Fast, familiar relief", "Usually gentle when used correctly"],
      cons: [
        "Too much can seriously harm the liver",
        "Not suitable for everyone",
      ],
      treats: ["Headache", "Toothache", "Muscle aches", "Fever"],
    },
    {
      name: "Cetirizine 10mg",
      detail: "Non-drowsy allergy support",
      price: "$9.00",
      tone: "blue",
      image:
        "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=700&q=80",
      categories: ["Cold & allergy"],
      description:
        "An antihistamine used to ease common allergy symptoms such as sneezing, itching, and a runny nose.",
      take: "Take with water and follow the label or advice from a pharmacist.",
      when: "Often taken once daily, preferably at the same time each day.",
      pros: ["Helps reduce sneezing and itching", "Convenient once-daily use"],
      cons: ["May still cause drowsiness", "Can cause dry mouth"],
      treats: ["Hay fever", "Hives", "Dust and pet allergies"],
    },
    {
      name: "Vitamin C + Zinc",
      detail: "Daily immune support",
      price: "$12.00",
      tone: "green",
      image:
        "https://images.unsplash.com/photo-1616671276441-2f7aeae7c7e1?auto=format&fit=crop&w=700&q=80",
      categories: ["Vitamins", "Cold & allergy"],
      description:
        "A daily supplement combining vitamin C and zinc to support normal immune function.",
      take: "Take with food and water. Do not use supplements as a replacement for a balanced diet.",
      when: "Take once daily according to the serving instructions on the product.",
      pros: ["Simple daily supplement", "Supports normal immune function"],
      cons: [
        "May upset the stomach in some people",
        "High doses are not better",
      ],
      treats: ["Nutritional deficiency support", "General wellness"],
    },
    {
      name: "Antacid Relief",
      detail: "Fast heartburn comfort",
      price: "$8.75",
      tone: "peach",
      image:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=700&q=80",
      categories: ["Digestive health"],
      description:
        "An antacid that neutralises stomach acid and provides short-term relief from heartburn and indigestion.",
      take: "Chew or take as directed on the pack. Ask a pharmacist if you take other medicines.",
      when: "Usually after meals or when symptoms occur, following the pack instructions.",
      pros: ["Can work quickly", "Easy to use when symptoms occur"],
      cons: [
        "Only gives short-term relief",
        "May interact with other medicines",
      ],
      treats: ["Heartburn", "Indigestion", "Acid discomfort"],
    },
    {
      name: "First Aid Care Kit",
      detail: "Home wound-care essentials",
      price: "$24.00",
      tone: "blue",
      image:
        "https://images.unsplash.com/photo-1603398938378-e54eab446ece?auto=format&fit=crop&w=700&q=80",
      categories: ["First aid"],
      description:
        "A compact kit with everyday supplies for cleaning and covering minor cuts, grazes, and small burns.",
      take: "Clean hands and the affected area first. Follow each item instruction and replace used supplies.",
      when: "Use immediately for minor injuries. Seek medical care for serious or infected wounds.",
      pros: ["Useful for home and travel", "Keeps basic supplies together"],
      cons: [
        "Not a substitute for urgent care",
        "Some people may react to adhesives",
      ],
      treats: ["Minor cuts", "Grazes", "Small superficial burns"],
    },
  ];
  const [category, setCategory] = useState("All medicines");
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<(typeof products)[number] | null>(
    null,
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<PharmacyOrder[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price.replace("$", "")) * item.quantity,
    0,
  );
  useEffect(() => {
    if (!db || !user) {
      setOrders([]);
      return;
    }
    return onSnapshot(
      query(collection(db, "orders"), where("userId", "==", user.uid)),
      (snapshot) =>
        setOrders(
          snapshot.docs
            .map((item) => ({ id: item.id, ...item.data() }) as PharmacyOrder)
            .sort((first, second) =>
              (second.createdAt ?? "").localeCompare(first.createdAt ?? ""),
            ),
        ),
    );
  }, [user]);
  const addToCart = (product: (typeof products)[number]) => {
    setCart((items) => {
      const existing = items.find((item) => item.name === product.name);
      if (existing)
        return items.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      return [
        ...items,
        { name: product.name, price: product.price, quantity: 1 },
      ];
    });
    setSelected(null);
    setCartOpen(true);
  };
  const updateQuantity = (name: string, quantity: number) => {
    setCart((items) =>
      quantity < 1
        ? items.filter((item) => item.name !== name)
        : items.map((item) =>
            item.name === name ? { ...item, quantity } : item,
          ),
    );
  };
  const checkout = async () => {
    if (!user) return onRequireAuth();
    if (!db || cart.length === 0) return;
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      items: cart,
      total: Number(cartTotal.toFixed(2)),
      status: "Received",
      createdAt: new Date().toISOString(),
    });
    setCart([]);
    setCartOpen(false);
    setCheckoutMessage("Order received. We will update you when it is ready.");
  };
  const filtered = products.filter((product) => {
    const matchesCategory =
      category === "All medicines" || product.categories.includes(category);
    const searchText =
      `${product.name} ${product.detail} ${product.categories.join(" ")} ${product.treats.join(" ")}`.toLowerCase();
    return matchesCategory && searchText.includes(searchTerm.toLowerCase());
  });
  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PaDoc pharmacy</p>
          <h2>Find the right everyday care</h2>
          <p className="pharmacy-intro">
            Browse by medicine type, then open any item for practical
            information before you buy.
          </p>
        </div>
        <div className="pharmacy-actions">
          <button className="cart-button" onClick={() => setCartOpen(true)}>
            Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
          <span className="pharmacy-note">Browse freely · Sign in to buy</span>
        </div>
      </div>
      <div className="pharmacy-toolbar">
        <div className="category-row">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "category-active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <input
          className="pharmacy-search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search medicines, symptoms, or categories"
          aria-label="Search medicines"
        />
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          No medicines match your search. Try another name, symptom, or
          category.
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <article className="product-card" key={product.name}>
              <button
                className="product-open"
                onClick={() => setSelected(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(event) => {
                    event.currentTarget.src = "/assets/images/doctor.jpg";
                  }}
                />
                <div className="product-copy">
                  <div className="tag-row">
                    {product.categories.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.detail}</p>
                  <strong>{product.price}</strong>
                  <span className="card-link">View medicine details →</span>
                </div>
              </button>
              <button
                className="add-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </article>
          ))}
        </div>
      )}
      {selected && (
        <div className="medicine-modal" role="dialog" aria-modal="true">
          <article className="medicine-detail">
            <button
              className="close-auth"
              onClick={() => setSelected(null)}
              aria-label="Close medicine details"
            >
              ×
            </button>
            <img
              src={selected.image}
              alt={selected.name}
              onError={(event) => {
                event.currentTarget.src = "/assets/images/doctor.jpg";
              }}
            />
            <div className="medicine-detail-copy">
              <div className="tag-row">
                {selected.categories.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <h2>{selected.name}</h2>
              <p className="medicine-description">{selected.description}</p>
              <div className="medicine-columns">
                <div>
                  <h3>How to take</h3>
                  <p>{selected.take}</p>
                  <h3>When to take</h3>
                  <p>{selected.when}</p>
                </div>
                <div>
                  <h3>What it treats</h3>
                  <ul>
                    {selected.treats.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3>Pros and cons</h3>
                  <p>
                    <b>Pros:</b> {selected.pros.join(" · ")}
                  </p>
                  <p>
                    <b>Cons:</b> {selected.cons.join(" · ")}
                  </p>
                </div>
              </div>
              <p className="medical-note">
                Always read the package label and ask a qualified pharmacist or
                doctor if you are unsure. This information does not replace
                medical advice.
              </p>
              <Button onClick={() => addToCart(selected)}>
                Add {selected.name} · {selected.price}
              </Button>
            </div>
          </article>
        </div>
      )}
      {cartOpen && (
        <div className="cart-modal" role="dialog" aria-modal="true">
          <article className="cart-panel">
            <button
              className="close-auth"
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
            >
              ×
            </button>
            <p className="eyebrow">Your basket</p>
            <h2>Pharmacy cart</h2>
            {cart.length === 0 ? (
              <div className="empty-state">Your cart is empty.</div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.name}>
                      <div>
                        <strong>{item.name}</strong>
                        <p>{item.price} each</p>
                      </div>
                      <div className="quantity-control">
                        <button
                          onClick={() =>
                            updateQuantity(item.name, item.quantity - 1)
                          }
                          aria-label={`Decrease ${item.name}`}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.name, item.quantity + 1)
                          }
                          aria-label={`Increase ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <strong>Total</strong>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </div>
                <Button onClick={checkout}>Place order</Button>
                {!user && (
                  <p className="medical-note">
                    Sign in is required to place your order.
                  </p>
                )}
              </>
            )}
          </article>
        </div>
      )}
      {checkoutMessage && <p className="order-success">{checkoutMessage}</p>}
      {user && (
        <section className="order-history">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your purchases</p>
              <h2>Order history</h2>
            </div>
          </div>
          {orders.length === 0 ? (
            <div className="empty-state">
              Your completed pharmacy orders will appear here.
            </div>
          ) : (
            <div className="appointment-list">
              {orders.map((order) => (
                <article key={order.id}>
                  <div className="date-tile">{order.items?.length ?? 0}</div>
                  <div>
                    <h3>{order.items?.map((item) => item.name).join(", ")}</h3>
                    <p>
                      {order.createdAt?.slice(0, 10) ?? "Recently"} · $
                      {order.total?.toFixed(2)}
                    </p>
                  </div>
                  <span className="status">{order.status ?? "Received"}</span>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </section>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>("user");
  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(
    () =>
      auth
        ? onAuthStateChanged(auth, async (current) => {
            setUser(current);
            if (current) setAuthOpen(false);
            if (current && db) {
              const userDoc = await getDoc(doc(db, "users", current.uid));
              if (userDoc.exists()) setRole("user");
              else {
                const doctorDoc = await getDoc(doc(db, "doctors", current.uid));
                setRole(doctorDoc.exists() ? "doctor" : "user");
              }
            }
            setLoading(false);
          })
        : undefined,
    [],
  );
  if (!configured) return <SetupNotice />;
  if (loading) return <div className="loader">Loading PaDoc...</div>;
  return (
    <>
      <Dashboard
        user={user}
        role={role}
        onSignOut={() => auth && signOut(auth)}
        onRequireAuth={() => setAuthOpen(true)}
      />
      {authOpen && (
        <div className="auth-modal" role="dialog" aria-modal="true">
          <Auth onRole={setRole} onClose={() => setAuthOpen(false)} />
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
