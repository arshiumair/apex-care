import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Video, 
  Stethoscope, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Award,
  Search,
  Filter,
  ChevronDown
} from 'lucide-react'

// Mock doctors data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "12 years",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      start: "09:00",
      end: "17:00"
    },
    consultationFee: 150,
    languages: ["English", "Spanish"],
    education: "MD, Harvard Medical School"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    experience: "8 years",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Mon", "Wed", "Fri", "Sat"],
      start: "10:00",
      end: "18:00"
    },
    consultationFee: 120,
    languages: ["English", "Mandarin"],
    education: "MD, Stanford University"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    experience: "15 years",
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1594824388852-8a0a6b0b8b8b?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Tue", "Wed", "Thu", "Sat", "Sun"],
      start: "08:00",
      end: "16:00"
    },
    consultationFee: 100,
    languages: ["English", "Spanish"],
    education: "MD, Johns Hopkins University"
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Orthopedist",
    experience: "10 years",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Mon", "Tue", "Thu", "Fri"],
      start: "09:00",
      end: "17:00"
    },
    consultationFee: 180,
    languages: ["English", "Korean"],
    education: "MD, UCLA Medical School"
  },
  {
    id: 5,
    name: "Dr. Lisa Wang",
    specialty: "Neurologist",
    experience: "14 years",
    rating: 4.9,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1594824388852-8a0a6b0b8b8b?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Mon", "Wed", "Fri"],
      start: "08:00",
      end: "16:00"
    },
    consultationFee: 200,
    languages: ["English", "Mandarin"],
    education: "MD, Johns Hopkins University"
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    specialty: "Psychiatrist",
    experience: "11 years",
    rating: 4.8,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Tue", "Wed", "Thu", "Sat"],
      start: "10:00",
      end: "18:00"
    },
    consultationFee: 160,
    languages: ["English"],
    education: "MD, Stanford University"
  },
  {
    id: 7,
    name: "Dr. Maria Garcia",
    specialty: "Gynecologist",
    experience: "9 years",
    rating: 4.9,
    reviews: 223,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      start: "09:00",
      end: "17:00"
    },
    consultationFee: 140,
    languages: ["English", "Spanish"],
    education: "MD, Harvard Medical School"
  },
  {
    id: 8,
    name: "Dr. Robert Taylor",
    specialty: "Ophthalmologist",
    experience: "13 years",
    rating: 4.7,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    availability: {
      days: ["Mon", "Wed", "Fri", "Sat"],
      start: "08:30",
      end: "16:30"
    },
    consultationFee: 170,
    languages: ["English"],
    education: "MD, UCLA Medical School"
  }
]

// Available time slots
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
]

const AppointmentBooking = () => {
  const navigate = useNavigate()
  
  // Form state
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [appointmentType, setAppointmentType] = useState('online')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    reason: '',
    symptoms: ''
  })
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const dropdownRef = React.useRef(null)

  // Available dates (next 30 days)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const availableDates = getAvailableDates()

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Get unique specializations
  const specializations = ['all', ...new Set(doctors.map(doctor => doctor.specialty))]

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    // Here you would typically send the data to your backend
    console.log('Booking confirmed:', {
      doctor: selectedDoctor,
      type: appointmentType,
      date: selectedDate,
      time: selectedTime,
      patient: patientDetails
    })
    
    // Navigate to success page or dashboard
    navigate('/patient-dashboard')
  }

  // Check if all required fields are filled for current step
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedDoctor !== null
      case 2:
        return appointmentType && selectedDate && selectedTime
      case 3:
        return patientDetails.name && patientDetails.email && patientDetails.phone && patientDetails.age && patientDetails.gender
      default:
        return false
    }
  }

  const nextStep = () => {
    if (canProceed() && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] font-inter">
      <Navbar />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-24 px-6 pb-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link 
                to="/our-doctors" 
                className="inline-flex items-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 text-sm font-medium mb-4"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Doctors
              </Link>
              <h1 className="text-4xl font-bold text-[#F8FAFC] mb-2">Book an Appointment</h1>
              <p className="text-[#94A3B8] text-lg">Schedule your consultation with our expert doctors</p>
            </div>
            
            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white' 
                      : 'bg-[#374151] text-[#94A3B8]'
                  }`}>
                    {currentStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      currentStep > step ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6]' : 'bg-[#374151]'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel - Form Steps */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1E293B] rounded-xl p-8 border border-[#374151]"
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Select Doctor */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">Choose Your Doctor</h2>
                    
                    {/* Search and Filter Section */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                          <input
                            type="text"
                            placeholder="Search doctors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent placeholder-[#94A3B8] text-sm"
                          />
                        </div>
                        
                        {/* Specialty Filter */}
                        <div className="relative" ref={dropdownRef}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            className="flex items-center space-x-2 px-3 py-2 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] hover:bg-[#4B5563] transition-all duration-300"
                          >
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {selectedSpecialty === 'all' ? 'All' : selectedSpecialty}
                            </span>
                            <ChevronDown className="w-4 h-4" />
                          </motion.button>
                          
                          {/* Dropdown Menu */}
                          {showFilterDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full right-0 mt-2 w-48 bg-[#374151] rounded-lg shadow-lg border border-[#4B5563] z-10"
                            >
                              <div className="py-2">
                                {specializations.map((specialty) => (
                                  <button
                                    key={specialty}
                                    onClick={() => {
                                      setSelectedSpecialty(specialty)
                                      setShowFilterDropdown(false)
                                    }}
                                    className={`w-full flex items-center px-4 py-2 text-sm hover:bg-[#4B5563] transition-colors duration-200 ${
                                      selectedSpecialty === specialty ? 'text-[#14B8A6] bg-[#14B8A6]/10' : 'text-[#F8FAFC]'
                                    }`}
                                  >
                                    <span className="capitalize">{specialty}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredDoctors.length === 0 ? (
                        <div className="col-span-2 text-center py-12">
                          <div className="w-20 h-20 bg-[#374151] rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-10 h-10 text-[#94A3B8]" />
                          </div>
                          <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">No Doctors Found</h3>
                          <p className="text-[#94A3B8] mb-4">
                            No doctors match your current search criteria. Try adjusting your search or filter.
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSearchTerm('')
                              setSelectedSpecialty('all')
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Clear Filters
                          </motion.button>
                        </div>
                      ) : (
                        filteredDoctors.map((doctor) => (
                        <motion.div
                          key={doctor.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedDoctor(doctor)}
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            selectedDoctor?.id === doctor.id
                              ? 'border-[#14B8A6] bg-[#14B8A6]/10'
                              : 'border-[#374151] hover:border-[#4B5563]'
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-1">{doctor.name}</h3>
                              <p className="text-[#14B8A6] font-medium mb-2">{doctor.specialty}</p>
                              <div className="flex items-center space-x-4 text-sm text-[#94A3B8] mb-3">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400" />
                                  <span>{doctor.rating}</span>
                                  <span>({doctor.reviews} reviews)</span>
                                </div>
                                <span>{doctor.experience} experience</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-[#F8FAFC] font-semibold">${doctor.consultationFee}</span>
                                <span className="text-[#94A3B8] text-sm">per consultation</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Select Date & Time */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">Select Date & Time</h2>
                    
                    {/* Appointment Type */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Consultation Type</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setAppointmentType('online')}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            appointmentType === 'online'
                              ? 'border-[#14B8A6] bg-[#14B8A6]/10'
                              : 'border-[#374151] hover:border-[#4B5563]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Video className="w-6 h-6 text-[#14B8A6]" />
                            <div className="text-left">
                              <h4 className="font-semibold text-[#F8FAFC]">Video Consultation</h4>
                              <p className="text-sm text-[#94A3B8]">Meet your doctor online</p>
                            </div>
                          </div>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setAppointmentType('in-person')}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            appointmentType === 'in-person'
                              ? 'border-[#14B8A6] bg-[#14B8A6]/10'
                              : 'border-[#374151] hover:border-[#4B5563]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-6 h-6 text-[#14B8A6]" />
                            <div className="text-left">
                              <h4 className="font-semibold text-[#F8FAFC]">In-Person Visit</h4>
                              <p className="text-sm text-[#94A3B8]">Visit our clinic</p>
                            </div>
                          </div>
                        </motion.button>
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Select Date</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {availableDates.slice(0, 10).map((date, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                            className={`p-3 rounded-lg border transition-all duration-300 ${
                              selectedDate === date.toISOString().split('T')[0]
                                ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-[#F8FAFC]'
                                : 'border-[#374151] hover:border-[#4B5563] text-[#94A3B8]'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                              <div className="text-lg font-bold">
                                {date.getDate()}
                              </div>
                              <div className="text-xs">
                                {date.toLocaleDateString('en-US', { month: 'short' })}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Select Time</h3>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {timeSlots.map((time) => (
                          <motion.button
                            key={time}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg border transition-all duration-300 ${
                              selectedTime === time
                                ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-[#F8FAFC]'
                                : 'border-[#374151] hover:border-[#4B5563] text-[#94A3B8]'
                            }`}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Patient Details */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">Patient Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={patientDetails.name}
                            onChange={(e) => setPatientDetails({...patientDetails, name: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={patientDetails.email}
                            onChange={(e) => setPatientDetails({...patientDetails, email: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={patientDetails.phone}
                            onChange={(e) => setPatientDetails({...patientDetails, phone: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Age *
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            max="120"
                            value={patientDetails.age}
                            onChange={(e) => setPatientDetails({...patientDetails, age: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                            placeholder="Enter your age"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Gender *
                          </label>
                          <select
                            required
                            value={patientDetails.gender}
                            onChange={(e) => setPatientDetails({...patientDetails, gender: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                            Reason for Visit
                          </label>
                          <input
                            type="text"
                            value={patientDetails.reason}
                            onChange={(e) => setPatientDetails({...patientDetails, reason: e.target.value})}
                            className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                            placeholder="Brief reason for consultation"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                          Symptoms (Optional)
                        </label>
                        <textarea
                          value={patientDetails.symptoms}
                          onChange={(e) => setPatientDetails({...patientDetails, symptoms: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-lg text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent resize-none"
                          placeholder="Describe your symptoms or concerns..."
                        />
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#374151]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-[#374151] text-[#6B7280] cursor-not-allowed'
                      : 'bg-[#374151] text-[#F8FAFC] hover:bg-[#4B5563]'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 inline mr-2" />
                  Previous
                </motion.button>

                <div className="flex items-center space-x-2 text-sm text-[#94A3B8]">
                  <span>Step {currentStep} of 3</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={currentStep === 3 ? handleSubmit : nextStep}
                  disabled={!canProceed()}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    canProceed()
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white hover:shadow-lg'
                      : 'bg-[#374151] text-[#6B7280] cursor-not-allowed'
                  }`}
                >
                  {currentStep === 3 ? 'Review Booking' : 'Next'}
                  {currentStep < 3 && <ChevronRight className="w-4 h-4 inline ml-2" />}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Booking Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1E293B] rounded-xl p-6 border border-[#374151] sticky top-24"
            >
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-6">Booking Summary</h3>
              
              {selectedDoctor && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-[#374151] rounded-lg">
                    <img
                      src={selectedDoctor.image}
                      alt={selectedDoctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-[#F8FAFC]">{selectedDoctor.name}</h4>
                      <p className="text-sm text-[#14B8A6]">{selectedDoctor.specialty}</p>
                    </div>
                  </div>

                  {appointmentType && (
                    <div className="p-4 bg-[#374151] rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        {appointmentType === 'online' ? (
                          <Video className="w-4 h-4 text-[#14B8A6]" />
                        ) : (
                          <MapPin className="w-4 h-4 text-[#14B8A6]" />
                        )}
                        <span className="font-medium text-[#F8FAFC]">
                          {appointmentType === 'online' ? 'Video Consultation' : 'In-Person Visit'}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedDate && (
                    <div className="p-4 bg-[#374151] rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-[#14B8A6]" />
                        <span className="font-medium text-[#F8FAFC]">
                          {new Date(selectedDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="p-4 bg-[#374151] rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-[#14B8A6]" />
                        <span className="font-medium text-[#F8FAFC]">{selectedTime}</span>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-[#374151] pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#94A3B8]">Consultation Fee</span>
                      <span className="font-semibold text-[#F8FAFC]">${selectedDoctor.consultationFee}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#94A3B8]">Platform Fee</span>
                      <span className="font-semibold text-[#F8FAFC]">$5</span>
                    </div>
                    <div className="border-t border-[#374151] mt-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#F8FAFC]">Total</span>
                        <span className="font-bold text-[#14B8A6] text-lg">
                          ${selectedDoctor.consultationFee + 5}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1E293B] rounded-xl p-8 max-w-md w-full border border-[#374151]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2">Confirm Booking</h3>
                <p className="text-[#94A3B8]">
                  Please review your appointment details before confirming.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                  <span className="text-[#94A3B8]">Doctor</span>
                  <span className="font-medium text-[#F8FAFC]">{selectedDoctor.name}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                  <span className="text-[#94A3B8]">Date & Time</span>
                  <span className="font-medium text-[#F8FAFC]">
                    {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                  <span className="text-[#94A3B8]">Type</span>
                  <span className="font-medium text-[#F8FAFC]">
                    {appointmentType === 'online' ? 'Video Consultation' : 'In-Person Visit'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                  <span className="text-[#94A3B8]">Total</span>
                  <span className="font-bold text-[#14B8A6]">${selectedDoctor.consultationFee + 5}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-3 bg-[#374151] text-[#F8FAFC] rounded-lg hover:bg-[#4B5563] transition-all duration-300"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmBooking}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Confirm Booking
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AppointmentBooking
