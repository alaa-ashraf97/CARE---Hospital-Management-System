# 🏥 CARE - Hospital Management System

A modern, responsive hospital management system for managing doctors' information with full CRUD (Create, Read, Update, Delete) operations.


## ✨ Features

- ✅ **Add New Doctors** - Register doctors with complete profile information
- 🔍 **Search Functionality** - Quick search by doctor name
- ✏️ **Update Records** - Edit existing doctor information
- 🗑️ **Delete Operations** - Remove individual or all doctor records
- 💾 **Persistent Storage** - Data saved in browser's LocalStorage
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Beautiful gradient design with Bootstrap 5
- ✅ **Form Validation** - Real-time input validation with regex patterns
- 🔔 **Sweet Alerts** - User-friendly notifications and confirmations

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom styling with CSS variables and gradients
- **JavaScript (ES6)** - Vanilla JS for all functionality
- **Bootstrap 5** - Responsive framework
- **Font Awesome** - Icon library
- **SweetAlert2** - Beautiful alert modals
- **LocalStorage API** - Client-side data persistence

## 📂 Project Structure

```
CARE-Hospital-Management/
│
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Custom styles
│   ├── bootstrap.min.css  # Bootstrap framework
│   └── all.min.css        # Font Awesome icons
├── js/
│   ├── script.js          # Main JavaScript logic
│   └── bootstrap.bundle.min.js
├── images/
│   ├── operational-system.png
│   └── default-doctor.png
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/care-hospital-management.git
   ```

2. **Navigate to project directory**
   ```bash
   cd care-hospital-management
   ```

3. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use Live Server extension in VS Code

### Alternative: Download ZIP

- Click the green "Code" button → Download ZIP
- Extract and open `index.html`

## 💻 Usage

### Adding a Doctor

1. Fill in all required fields:
   - **Doctor Name**: Must start with uppercase letter (3-16 characters)
   - **Profile Details**: Minimum 26 characters
   - **Fees**: Between 100-2000 LE
   - **Specialization**: Select from dropdown
   - **Status**: Choose Online/Away/Offline
   - **Image**: Upload doctor's photo (optional)

2. Click "ADD New Doctor" button
3. Success alert will confirm the addition

### Updating a Doctor

1. Click "Update" button on any doctor card
2. Form will populate with existing data
3. Modify the required fields
4. Click "Update Doctor" button

### Deleting Records

- **Single Delete**: Click "Delete" on specific doctor card
- **Delete All**: Click "Delete All" button (requires confirmation)

### Searching

- Type doctor's name in the search bar
- Results filter in real-time

## 🎨 UI Features

### Color Scheme

- **Primary Dark**: `#0a0e27`
- **Electric Blue**: `#0ea5e9`
- **Sky Blue**: `#38bdf8`
- **Neon Blue**: `#00d9ff`

### Design Elements

- Gradient backgrounds
- Glassmorphism effects
- Smooth transitions
- Hover animations
- Box shadows with glow effects

## 📋 Validation Rules

| Field | Rule |
|-------|------|
| Doctor Name | `^[A-Z][A-Za-z _-]{2,15}$` |
| Profile Details | `^[A-z][A-Za-z0-9 ]{25,}$` |
| Fees | `100-2000` (numeric) |
| Specialization | Required selection |
| Status | Required (default: Offline) |

