import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { 
  LayoutDashboard, 
  CalendarDays, 
  ClipboardList, 
  CreditCard, 
  UserCircle, 
  Settings, 
  LogOut,
  Users,
  Building2,
  Calendar,
  Phone,
  FileText,
  MessageCircle,
  Check,
  X,
  Circle
} from 'lucide-react'

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-[#1E293B]/30 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-[#94A3B8] text-sm mb-4"> 
            © 2025 Apex Care. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <Link 
              to="#" 
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 text-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              to="#" 
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 text-sm"
            >
              Terms of Service
            </Link>
            <Link 
              to="#" 
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 text-sm"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

const DoctorDashboard = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [activeTab, setActiveTab] = useState('upcoming')
  const [availabilityStatus, setAvailabilityStatus] = useState('online')
  const [showSettings, setShowSettings] = useState(false)
  const [showPatientDetails, setShowPatientDetails] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false
  })

  // Doctor profile data
  const doctorProfile = {
    name: "Dr. Ayesha Malik",
    specialty: "Cardiologist",
    role: "MBBS, FCPS",
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
  }

  // Placeholder data arrays
  const appointments = [
    { id: 1, patientName: "M.J. Mical", reason: "Health Checkup", time: "09:30", status: "ongoing", date: "2025-01-19", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { id: 2, patientName: "Sanath Deo", reason: "Follow-up", time: "12:30", status: "upcoming", date: "2025-01-19", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
    { id: 3, patientName: "Ahmed Khan", reason: "Chest pain evaluation", time: "14:00", status: "upcoming", date: "2025-01-19", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    { id: 4, patientName: "Fatima Ali", reason: "Blood pressure check", time: "16:30", status: "upcoming", date: "2025-01-19", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" }
  ]

  const patients = [
    { id: 101, name: "Sanath Deo", dob: "1989-01-15", sex: "Male", weight: "59 kg", lastAppointment: "2025-01-15", height: "5'8\"", regDate: "2024-03-10" },
    { id: 102, name: "M.J. Mical", dob: "1975-08-22", sex: "Female", weight: "65 kg", lastAppointment: "2025-01-19", height: "5'6\"", regDate: "2024-01-15" },
    { id: 103, name: "Ahmed Khan", dob: "1982-12-03", sex: "Male", weight: "72 kg", lastAppointment: "2025-01-18", height: "5'10\"", regDate: "2024-05-20" }
  ]

  const appointmentRequests = [
    { id: 1, patientName: "John Smith", reason: "General consultation", time: "10:00 AM", date: "2025-01-20" },
    { id: 2, patientName: "Sarah Johnson", reason: "Follow-up visit", time: "2:00 PM", date: "2025-01-20" },
    { id: 3, patientName: "Mike Wilson", reason: "Health screening", time: "4:00 PM", date: "2025-01-21" }
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays },
    { id: 'appointment-page', label: 'Appointment Page', icon: ClipboardList },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Logout', icon: LogOut }
  ]

  const handleAvailabilityToggle = (status) => {
    setAvailabilityStatus(status)
  }

  const handleAppointmentAction = (appointmentId, action) => {
    console.log(`${action} appointment ${appointmentId}`)
  }

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient)
    setShowPatientDetails(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#22C55E'
      case 'busy': return '#3B82F6'
      case 'offline': return '#EF4444'
      case 'ongoing': return '#22C55E'
      case 'upcoming': return '#3B82F6'
      case 'pending': return '#F59E0B'
      case 'confirmed': return '#22C55E'
      case 'completed': return '#6B7280'
      default: return '#6B7280'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online'
      case 'busy': return 'Busy'
      case 'offline': return 'Offline'
      case 'ongoing': return 'On Going'
      case 'upcoming': return 'Upcoming'
      case 'pending': return 'Pending'
      case 'confirmed': return 'Confirmed'
      case 'completed': return 'Completed'
      default: return status
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return <Circle size={8} className="text-green-500 fill-current" />
      case 'busy': return <Circle size={8} className="text-blue-500 fill-current" />
      case 'offline': return <Circle size={8} className="text-red-500 fill-current" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] font-inter">
      <Navbar />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="sticky top-0 bg-[#0F172A]/80 backdrop-blur-md border-b border-[#1E293B]/30 p-6 z-10 pt-24"
        style={{
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#F8FAFC] ml-16">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 bg-[#1E293B] border border-[#1E293B]/50 rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300"
            />
            <button className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 13h6v-2H4v2zM4 7h6V5H4v2z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EF4444] rounded-full"></div>
            </button>
            <img
              src={doctorProfile.image}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      <div className="flex" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Sidebar */}
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className={`${sidebarCollapsed ? 'w-18' : 'w-70'} bg-[#111827] rounded-r-xl transition-all duration-300 flex flex-col`}
          style={{
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
            minHeight: 'calc(100vh - 120px)'
          }}
        >
          {/* Toggle Button */}
          <div className="relative w-full">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`absolute p-3 text-[#94A3B8] hover:text-[#F8FAFC] transition-all duration-300 z-30 bg-[#111827] rounded-lg hover:bg-[#1E293B] border border-[#1E293B] shadow-lg ${
                sidebarCollapsed ? 'top-2 right-2' : 'top-4 right-4'
              }`}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            </button>
          </div>

          {/* Doctor Profile */}
          <div className={`${sidebarCollapsed ? 'p-2 pt-16' : 'p-6 pt-16'}`}>
            <div className="text-center">
              <img
                src={doctorProfile.image}
                alt={doctorProfile.name}
                className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-30 h-30'} rounded-full object-cover mx-auto mb-4 transition-all duration-300`}
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}
              />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-bold text-[#F8FAFC] mb-1">{doctorProfile.name}</h3>
                    <p className="text-[#14B8A6] font-semibold text-sm mb-1">{doctorProfile.specialty}</p>
                    <p className="text-[#94A3B8] text-xs mb-1">{doctorProfile.role}</p>
                    <p className="text-[#94A3B8] text-xs">{doctorProfile.experience}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Availability Toggle */}
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mt-6"
                >
                  <div className="flex space-x-1 bg-[#1E293B] rounded-lg p-1">
                    {['online', 'busy', 'offline'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleAvailabilityToggle(status)}
                        className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all duration-300 ${
                          availabilityStatus === status
                            ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white'
                            : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Menu Items */}
          <div className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-4'} pb-6`}>
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'px-2 py-3 justify-center' : 'px-4 py-3'} rounded-lg transition-all duration-300 group ${
                    activeMenu === item.id
                      ? 'bg-gradient-to-r from-[#2563EB]/20 to-[#14B8A6]/20 border border-[#2563EB]/30 text-[#F8FAFC]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/50'
                  }`}
                  style={activeMenu === item.id ? {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  } : {}}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <item.icon 
                    size={22} 
                    className={`transition-colors duration-300 ${
                      activeMenu === item.id 
                        ? 'text-[#F8FAFC]' 
                        : 'text-[#94A3B8] group-hover:text-[#F8FAFC]'
                    }`}
                  />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-medium ml-3"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto" style={{ minHeight: 'calc(100vh - 120px)' }}>

          <div className="p-6 space-y-6">
            {/* KPI Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { title: "Total Patients", value: "2000+", icon: Users, color: "#2563EB" },
                { title: "Today Patients", value: "068", icon: Building2, color: "#14B8A6" },
                { title: "Today Appointments", value: "085", icon: Calendar, color: "#22C55E" }
              ].map((kpi, index) => (
                <motion.div
                  key={kpi.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                  style={{
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#94A3B8] text-sm mb-2">{kpi.title}</p>
                      <p className="text-3xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${kpi.color}20` }}>
                      <kpi.icon size={24} style={{ color: kpi.color }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Patients Summary */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:col-span-2 bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                style={{
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                }}
              >
                <h3 className="text-xl font-bold text-[#F8FAFC] mb-6">Patients Summary</h3>
                
                {/* Donut Chart Placeholder */}
                <div className="flex items-center justify-center mb-6">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6] flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-[#1E293B] flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#F8FAFC]">75%</span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center space-x-6 mb-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#2563EB] rounded-full mr-2"></div>
                    <span className="text-[#94A3B8] text-sm">New Patients</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#14B8A6] rounded-full mr-2"></div>
                    <span className="text-[#94A3B8] text-sm">Old Patients</span>
                  </div>
                </div>

                {/* Patient Reviews */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-[#F8FAFC]">Patient Reviews</h4>
                  {[
                    { label: "Excellent", percentage: 85, color: "#22C55E" },
                    { label: "Great", percentage: 70, color: "#14B8A6" },
                    { label: "Good", percentage: 60, color: "#2563EB" },
                    { label: "Average", percentage: 40, color: "#F59E0B" }
                  ].map((review) => (
                    <div key={review.label} className="flex items-center justify-between">
                      <span className="text-[#94A3B8] text-sm w-20">{review.label}</span>
                      <div className="flex-1 mx-4 bg-[#0F172A] rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${review.percentage}%`,
                            backgroundColor: review.color
                          }}
                        ></div>
                      </div>
                      <span className="text-[#F8FAFC] text-sm w-12 text-right">{review.percentage}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Today's Appointments */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                  style={{
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Today's Appointments</h3>
                  <div className="space-y-3">
                    {appointments.slice(0, 4).map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center p-3 bg-[#0F172A] rounded-lg hover:bg-[#0F172A]/80 transition-colors cursor-pointer"
                        onClick={() => handlePatientSelect(appointment)}
                      >
                        <img
                          src={appointment.avatar}
                          alt={appointment.patientName}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div className="flex-1">
                          <p className="text-[#F8FAFC] font-medium text-sm">{appointment.patientName}</p>
                          <p className="text-[#94A3B8] text-xs">{appointment.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#F8FAFC] text-xs font-medium">{appointment.time}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            {getStatusIcon(appointment.status)}
                            <span
                              className="px-2 py-1 rounded-full text-xs text-white"
                              style={{ backgroundColor: getStatusColor(appointment.status) }}
                            >
                              {getStatusText(appointment.status)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <button className="w-full text-[#14B8A6] text-sm font-medium hover:text-[#14B8A6]/80 transition-colors">
                      See All
                    </button>
                  </div>
                </motion.div>

                {/* Next Patient Details */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                  style={{
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Next Patient Details</h3>
                  <div className="flex items-center mb-4">
                    <img
                      src={appointments[0].avatar}
                      alt={appointments[0].patientName}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="text-[#F8FAFC] font-medium">{appointments[0].patientName}</p>
                      <p className="text-[#94A3B8] text-sm">ID: #{appointments[0].id}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <span className="text-[#94A3B8]">DOB:</span>
                      <p className="text-[#F8FAFC]">1989-01-15</p>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Sex:</span>
                      <p className="text-[#F8FAFC]">Male</p>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Weight:</span>
                      <p className="text-[#F8FAFC]">59 kg</p>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Height:</span>
                      <p className="text-[#F8FAFC]">5'8"</p>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Last Visit:</span>
                      <p className="text-[#F8FAFC]">2025-01-15</p>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Reg. Date:</span>
                      <p className="text-[#F8FAFC]">2024-03-10</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-[#14B8A6] text-white rounded-lg text-xs font-medium hover:bg-[#14B8A6]/80 transition-colors flex items-center justify-center gap-1">
                      <Phone size={14} />
                      Call
                    </button>
                    <button className="flex-1 px-3 py-2 bg-[#2563EB] text-white rounded-lg text-xs font-medium hover:bg-[#2563EB]/80 transition-colors flex items-center justify-center gap-1">
                      <FileText size={14} />
                      Document
                    </button>
                    <button className="flex-1 px-3 py-2 bg-[#22C55E] text-white rounded-lg text-xs font-medium hover:bg-[#22C55E]/80 transition-colors flex items-center justify-center gap-1">
                      <MessageCircle size={14} />
                      Chat
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Appointment Requests */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                style={{
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                }}
              >
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Appointment Requests</h3>
                <div className="space-y-3">
                  {appointmentRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-[#0F172A] rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#14B8A6] rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {request.patientName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[#F8FAFC] font-medium text-sm">{request.patientName}</p>
                          <p className="text-[#94A3B8] text-xs">{request.reason}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-[#22C55E] text-white rounded text-xs hover:bg-[#22C55E]/80 transition-colors flex items-center justify-center">
                          <Check size={12} />
                        </button>
                        <button className="px-3 py-1 bg-[#EF4444] text-white rounded text-xs hover:bg-[#EF4444]/80 transition-colors flex items-center justify-center">
                          <X size={12} />
                        </button>
                        <button className="px-3 py-1 bg-[#2563EB] text-white rounded text-xs hover:bg-[#2563EB]/80 transition-colors flex items-center justify-center">
                          <MessageCircle size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50"
                style={{
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                }}
              >
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Calendar</h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F8FAFC] mb-2">January 2025</div>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                      <div key={day} className="p-2 text-[#94A3B8] font-medium">{day}</div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => (
                      <div
                        key={i + 1}
                        className={`p-2 text-[#F8FAFC] cursor-pointer hover:bg-[#14B8A6]/20 rounded ${
                          i + 1 === 19 ? 'bg-[#14B8A6] text-white' : ''
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#2563EB] rounded-full mr-2"></div>
                      <span className="text-[#94A3B8] text-xs">Online</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#14B8A6] rounded-full mr-2"></div>
                      <span className="text-[#94A3B8] text-xs">In-clinic</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Details Drawer */}
      <AnimatePresence>
        {showPatientDetails && selectedPatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
            onClick={() => setShowPatientDetails(false)}
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-96 h-full bg-[#1E293B] p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#F8FAFC]">Patient Details</h3>
                <button
                  onClick={() => setShowPatientDetails(false)}
                  className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="text-center mb-6">
                <img
                  src={selectedPatient.avatar}
                  alt={selectedPatient.patientName}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="text-lg font-bold text-[#F8FAFC]">{selectedPatient.patientName}</h4>
                <p className="text-[#94A3B8] text-sm">{selectedPatient.reason}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="text-[#F8FAFC] font-medium mb-2">Contact Information</h5>
                  <p className="text-[#94A3B8] text-sm">Phone: +92 300 1234567</p>
                  <p className="text-[#94A3B8] text-sm">Email: patient@example.com</p>
                </div>
                
                <div>
                  <h5 className="text-[#F8FAFC] font-medium mb-2">Medical History</h5>
                  <p className="text-[#94A3B8] text-sm">No significant medical history</p>
                </div>

                <div>
                  <h5 className="text-[#F8FAFC] font-medium mb-2">Last Prescription</h5>
                  <p className="text-[#94A3B8] text-sm">Medication: Aspirin 100mg</p>
                  <p className="text-[#94A3B8] text-sm">Dosage: Once daily</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default DoctorDashboard