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
  Circle,
  Monitor,
  Building
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
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)

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

  // Extended appointments data for the appointments page
  const allAppointments = [
    {
      id: 1,
      name: "Ayesha Khan",
      age: 27,
      date: "2025-01-20",
      time: "10:00 AM",
      purpose: "Follow-up on test results",
      mode: "Online",
      status: "Upcoming",
      avatar: "https://media.istockphoto.com/id/1206181103/photo/face-of-happy-young-persian-woman-smiling-in-traditional-clothing.jpg?s=612x612&w=0&k=20&c=6Kos894F11JWo5BmnqFladEquUeHTmvv6UK8m4gHJRk=",
      phone: "+92 300 1234567",
      email: "ayesha.khan@email.com"
    },
    {
      id: 2,
      name: "Bilal Ahmed",
      age: 35,
      date: "2025-01-19",
      time: "4:30 PM",
      purpose: "General Consultation",
      mode: "In-person",
      status: "Completed",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      phone: "+92 300 2345678",
      email: "bilal.ahmed@email.com"
    },
    {
      id: 3,
      name: "Fatima Ali",
      age: 42,
      date: "2025-01-21",
      time: "2:00 PM",
      purpose: "Blood pressure check",
      mode: "Online",
      status: "Upcoming",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      phone: "+92 300 3456789",
      email: "fatima.ali@email.com"
    },
    {
      id: 4,
      name: "Hassan Khan",
      age: 29,
      date: "2025-01-18",
      time: "11:30 AM",
      purpose: "Chest pain evaluation",
      mode: "In-person",
      status: "Completed",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      phone: "+92 300 4567890",
      email: "hassan.khan@email.com"
    },
    {
      id: 5,
      name: "Sara Ahmed",
      age: 31,
      date: "2025-01-22",
      time: "3:15 PM",
      purpose: "Diabetes management",
      mode: "Online",
      status: "Upcoming",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      phone: "+92 300 5678901",
      email: "sara.ahmed@email.com"
    },
    {
      id: 6,
      name: "Omar Sheikh",
      age: 45,
      date: "2025-01-17",
      time: "9:00 AM",
      purpose: "Annual health checkup",
      mode: "In-person",
      status: "Cancelled",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      phone: "+92 300 6789012",
      email: "omar.sheikh@email.com"
    }
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays },
    { id: 'appointment-page', label: 'Appointment Page', icon: ClipboardList, isExternal: true },
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

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment)
    setShowAppointmentModal(true)
  }

  const handleStatusChange = (appointmentId, newStatus) => {
    console.log(`Changing appointment ${appointmentId} status to ${newStatus}`)
    // In a real app, this would update the backend
  }

  const getAppointmentStatusColor = (status) => {
    switch (status) {
      case 'Upcoming': return '#22C55E'
      case 'Completed': return '#2563EB'
      case 'Cancelled': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const getModeIcon = (mode) => {
    return mode === 'Online' ? <Monitor size={16} className="text-[#14B8A6]" /> : <Building size={16} className="text-[#2563EB]" />
  }

  // Filter appointments based on search and status
  const filteredAppointments = allAppointments.filter(appointment => {
    const matchesSearch = appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.date.includes(searchTerm) ||
                         appointment.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
                  <div className="flex h-10 w-full sm:w-96 border border-gray-700 rounded-full overflow-hidden bg-transparent gap-0">
                    <button
                      onClick={() => handleAvailabilityToggle('online')}
                      className={`w-1/3 flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-300 ease-in-out ${
                        availabilityStatus === 'online'
                          ? 'bg-green-600 text-white shadow-[0_0_8px_#22c55e]'
                          : 'text-gray-400 hover:bg-gray-800'
                      } rounded-l-full`}
                      style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'
                      }}
                    >
                      Online
                    </button>

                    <button
                      onClick={() => handleAvailabilityToggle('busy')}
                      className={`w-1/3 flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-300 ease-in-out ${
                        availabilityStatus === 'busy'
                          ? 'bg-blue-600 text-white shadow-[0_0_8px_#2563eb]'
                          : 'text-gray-400 hover:bg-gray-800'
                      }`}
                      style={{
                        transform: 'skewX(-15deg)'
                      }}
                    >
                      <span style={{ transform: 'skewX(15deg)' }}>Busy</span>
                    </button>

                    <button
                      onClick={() => handleAvailabilityToggle('offline')}
                      className={`w-1/3 flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-300 ease-in-out ${
                        availabilityStatus === 'offline'
                          ? 'bg-red-600 text-white shadow-[0_0_8px_#dc2626]'
                          : 'text-gray-400 hover:bg-gray-800'
                      } rounded-r-full`}
                      style={{
                        clipPath: 'polygon(10px 0%, 100% 0%, 100% 100%, 0% 100%)'
                      }}
                    >
                      Offline
                    </button>
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
                  onClick={() => {
                    if (item.isExternal) {
                      // Navigate to LiveAppointment page with mock data
                      navigate('/live-appointment', {
                        state: {
                          id: 'APT-DEMO-001',
                          patientName: 'Demo Patient',
                          patientAge: 30,
                          patientGender: 'Not specified',
                          patientId: 'PAT-DEMO-001',
                          consultationType: 'Video Consultation',
                          startTime: new Date(),
                          medicalHistory: 'Demo consultation for testing purposes.',
                          lastVisit: '2024-12-15'
                        }
                      })
                    } else {
                      setActiveMenu(item.id)
                    }
                  }}
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

          {/* Dashboard Content */}
          {activeMenu === 'dashboard' && (
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
                      <p className="text-gray-200 font-semibold text-sm mb-2">{kpi.title}</p>
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
                
                {/* Donut Chart */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    {/* Single conic gradient for both segments */}
                    <div 
                      className="w-48 h-48 rounded-full"
                      style={{
                        background: `conic-gradient(from 0deg, #2563EB 0deg, #2563EB ${57 * 3.6}deg, #14B8A6 ${57 * 3.6}deg, #14B8A6 360deg)`
                      }}
                    ></div>
                    {/* Center circle */}
                    <div className="absolute top-6 left-6 w-36 h-36 rounded-full bg-[#1E293B] flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#F8FAFC]">57%</span>
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
          )}

          {/* Appointments Page */}
          {activeMenu === 'appointments' && (
            <div className="p-6 space-y-6">
              {/* Page Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <h1 className="text-3xl font-bold text-[#F8FAFC]">Appointments</h1>
                
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search by name, date, or purpose..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-[#1E293B] border border-[#1E293B]/50 rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 w-full sm:w-80"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-[#1E293B] border border-[#1E293B]/50 rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300"
                  >
                    <option value="All">All Status</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </motion.div>

              {/* Appointments Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#1E293B] rounded-xl p-6 border border-[#1E293B]/50 cursor-pointer hover:bg-[#1E293B]/80 transition-all duration-300"
                    style={{
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                    }}
                    onClick={() => handleAppointmentSelect(appointment)}
                  >
                    {/* Patient Info */}
                    <div className="flex items-center mb-4">
                      <img
                        src={appointment.avatar}
                        alt={appointment.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-[#F8FAFC]">{appointment.name}</h3>
                        <p className="text-[#94A3B8] text-sm">Age: {appointment.age}</p>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#94A3B8] text-sm">Date & Time</span>
                        <span className="text-[#F8FAFC] text-sm font-medium">{appointment.date} at {appointment.time}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[#94A3B8] text-sm">Purpose</span>
                        <span className="text-[#F8FAFC] text-sm">{appointment.purpose}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[#94A3B8] text-sm">Mode</span>
                        <div className="flex items-center gap-2">
                          {getModeIcon(appointment.mode)}
                          <span className="text-[#F8FAFC] text-sm">{appointment.mode}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center justify-between">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getAppointmentStatusColor(appointment.status) }}
                      >
                        {appointment.status}
                      </span>
                      
                      <div className="flex gap-2">
                        {appointment.status === 'Upcoming' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate('/live-appointment', { 
                                state: {
                                  id: `APT-${appointment.id}`,
                                  patientName: appointment.name,
                                  patientAge: appointment.age,
                                  patientGender: 'Not specified',
                                  patientId: `PAT-${appointment.id}`,
                                  consultationType: appointment.mode === 'Online' ? 'Video Consultation' : 'In-Person Consultation',
                                  startTime: new Date(),
                                  medicalHistory: 'Previous consultation records available.',
                                  lastVisit: '2024-12-15'
                                }
                              })
                            }}
                            className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 text-xs font-medium"
                            title="Join Live Appointment"
                          >
                            Join Live
                          </motion.button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle call action
                          }}
                          className="p-2 bg-[#14B8A6] text-white rounded-lg hover:bg-[#14B8A6]/80 transition-colors"
                          title="Call Patient"
                        >
                          <Phone size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle chat action
                          }}
                          className="p-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#2563EB]/80 transition-colors"
                          title="Chat with Patient"
                        >
                          <MessageCircle size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* No Results */}
              {filteredAppointments.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-[#94A3B8] text-lg">No appointments found</div>
                  <div className="text-[#94A3B8] text-sm mt-2">Try adjusting your search or filter criteria</div>
                </motion.div>
              )}
            </div>
          )}
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

      {/* Appointment Details Modal */}
      <AnimatePresence>
        {showAppointmentModal && selectedAppointment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAppointmentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1E293B] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#1E293B]/50"
              style={{
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#F8FAFC]">Appointment Details</h3>
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Patient Info */}
              <div className="text-center mb-6">
                <img
                  src={selectedAppointment.avatar}
                  alt={selectedAppointment.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="text-xl font-bold text-[#F8FAFC]">{selectedAppointment.name}</h4>
                <p className="text-[#94A3B8]">Age: {selectedAppointment.age}</p>
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-[#F8FAFC] font-medium mb-2">Appointment Information</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Date:</span>
                        <span className="text-[#F8FAFC]">{selectedAppointment.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Time:</span>
                        <span className="text-[#F8FAFC]">{selectedAppointment.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Mode:</span>
                        <div className="flex items-center gap-2">
                          {getModeIcon(selectedAppointment.mode)}
                          <span className="text-[#F8FAFC]">{selectedAppointment.mode}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Status:</span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: getAppointmentStatusColor(selectedAppointment.status) }}
                        >
                          {selectedAppointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-[#F8FAFC] font-medium mb-2">Contact Information</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Phone:</span>
                        <span className="text-[#F8FAFC]">{selectedAppointment.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Email:</span>
                        <span className="text-[#F8FAFC]">{selectedAppointment.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <div className="mb-6">
                <h5 className="text-[#F8FAFC] font-medium mb-2">Purpose / Problem Summary</h5>
                <p className="text-[#94A3B8] bg-[#0F172A] p-3 rounded-lg">{selectedAppointment.purpose}</p>
              </div>

              {/* Status Change */}
              <div className="mb-6">
                <h5 className="text-[#F8FAFC] font-medium mb-2">Change Status</h5>
                <select
                  value={selectedAppointment.status}
                  onChange={(e) => handleStatusChange(selectedAppointment.id, e.target.value)}
                  className="w-full px-4 py-2 bg-[#0F172A] border border-[#1E293B]/50 rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-4 py-2 bg-[#14B8A6] text-white rounded-lg hover:bg-[#14B8A6]/80 transition-colors flex items-center justify-center gap-2">
                  <Phone size={16} />
                  Call Patient
                </button>
                <button className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#2563EB]/80 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={16} />
                  Send Message
                </button>
                <button className="flex-1 px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#22C55E]/80 transition-colors flex items-center justify-center gap-2">
                  <FileText size={16} />
                  Add Prescription
                </button>
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