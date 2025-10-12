import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  Send, 
  Save, 
  Clock, 
  User, 
  FileText, 
  Pill,
  TestTube,
  Check,
  X,
  Eye,
  AlertCircle
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
            <a href="#" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 text-sm">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const LiveAppointment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get appointment data from location state or use mock data
  const appointmentData = location.state || {
    id: 'APT-2025-001',
    patientName: 'Ayesha Khan',
    patientAge: 27,
    patientGender: 'Female',
    patientId: 'PAT-001',
    consultationType: 'Video Consultation',
    startTime: new Date(),
    medicalHistory: 'Previous consultation for chest pain. No known allergies.',
    lastVisit: '2024-12-15'
  }

  // State management
  const [sessionTime, setSessionTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isConnected, setIsConnected] = useState(true)
  const [isPatientTyping, setIsPatientTyping] = useState(false)
  const [showPatientRecord, setShowPatientRecord] = useState(false)
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'patient',
      message: 'Hello Doctor, thank you for taking my appointment.',
      time: '10:30 AM',
      read: true
    },
    {
      id: 2,
      sender: 'doctor',
      message: 'Hello Ayesha! How are you feeling today?',
      time: '10:31 AM',
      read: true
    },
    {
      id: 3,
      sender: 'patient',
      message: 'I have been experiencing chest pain for the past 2 days.',
      time: '10:32 AM',
      read: true
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  
  // Notes state
  const [notes, setNotes] = useState('')
  const [notesSaved, setNotesSaved] = useState(false)
  
  // Prescription state
  const [prescriptions, setPrescriptions] = useState([])
  const [newPrescription, setNewPrescription] = useState({
    medicine: '',
    dosage: '',
    duration: ''
  })
  
  // Test recommendation state
  const [testRecommendations, setTestRecommendations] = useState([])
  const [newTest, setNewTest] = useState({
    type: '',
    comments: ''
  })
  
  const chatEndRef = useRef(null)
  const notesTextareaRef = useRef(null)

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // Auto-save notes every 2 minutes
  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      if (notes.trim()) {
        handleSaveNotes()
      }
    }, 120000) // 2 minutes
    return () => clearInterval(autoSaveTimer)
  }, [notes])

  // Format session time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Chat functions
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'doctor',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      }
      setChatMessages([...chatMessages, message])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Notes functions
  const handleSaveNotes = () => {
    console.log('Saving notes:', notes)
    setNotesSaved(true)
    setTimeout(() => setNotesSaved(false), 2000)
  }

  // Prescription functions
  const handleSendPrescription = () => {
    if (newPrescription.medicine && newPrescription.dosage && newPrescription.duration) {
      const prescription = {
        id: prescriptions.length + 1,
        ...newPrescription,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString()
      }
      setPrescriptions([...prescriptions, prescription])
      setNewPrescription({ medicine: '', dosage: '', duration: '' })
    }
  }

  // Test recommendation functions
  const handleSendTestRecommendation = () => {
    if (newTest.type) {
      const test = {
        id: testRecommendations.length + 1,
        ...newTest,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString()
      }
      setTestRecommendations([...testRecommendations, test])
      setNewTest({ type: '', comments: '' })
    }
  }

  // End appointment
  const handleEndAppointment = () => {
    if (window.confirm('Are you sure you want to end this appointment?')) {
      navigate('/doctor-dashboard')
    }
  }

  const testTypes = [
    'Blood Test',
    'X-Ray',
    'MRI Scan',
    'CT Scan',
    'ECG',
    'Ultrasound',
    'Urine Test',
    'Stool Test'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
      <Navbar />
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 bg-[#0F172A]/80 backdrop-blur-md border-b border-[#1E293B]/30 p-6 z-10 pt-24"
        style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-[#14B8A6]" />
              <div>
                <h1 className="text-2xl font-bold text-[#F8FAFC]">{appointmentData.patientName}</h1>
                <p className="text-[#94A3B8] text-sm">Appointment ID: {appointmentData.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Live</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#94A3B8]" />
              <span className="text-[#F8FAFC] font-mono text-lg">{formatTime(sessionTime)}</span>
            </div>
            <div className="text-[#94A3B8] text-sm">
              {appointmentData.consultationType}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEndAppointment}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium shadow-lg"
            >
              End Appointment
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Panel - Live Interaction Area (65% width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Video Call Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1E293B] rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                {/* Patient Video Frame */}
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <User className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">Patient Video</p>
                    <p className="text-gray-500 text-sm">{appointmentData.patientName}</p>
                  </div>
                </div>
                
                {/* Doctor's Preview (small corner frame) */}
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border-2 border-[#14B8A6] overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isMuted ? 'bg-red-600 text-white' : 'bg-[#374151] text-[#F8FAFC] hover:bg-[#4B5563]'
                  }`}
                >
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    !isVideoOn ? 'bg-red-600 text-white' : 'bg-[#374151] text-[#F8FAFC] hover:bg-[#4B5563]'
                  }`}
                >
                  {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleEndAppointment}
                  className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all duration-300"
                >
                  <Phone size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Chat Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1E293B] rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
            >
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Live Chat</h3>
              
              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto space-y-4 mb-4 pr-2">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        msg.sender === 'doctor'
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white'
                          : 'bg-[#374151] text-[#F8FAFC]'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs ${
                          msg.sender === 'doctor' ? 'text-white/70' : 'text-gray-400'
                        }`}>
                          {msg.time}
                        </p>
                        {msg.sender === 'doctor' && (
                          <Check size={12} className="text-white/70" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              
              {/* Chat Input */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="px-4 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Tools & Patient Info (35% width on desktop) */}
          <div className="space-y-6">
            
            {/* Patient Information Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1E293B] rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
            >
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Patient Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Name:</span>
                  <span className="text-[#F8FAFC]">{appointmentData.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Age:</span>
                  <span className="text-[#F8FAFC]">{appointmentData.patientAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Gender:</span>
                  <span className="text-[#F8FAFC]">{appointmentData.patientGender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Patient ID:</span>
                  <span className="text-[#F8FAFC]">{appointmentData.patientId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Last Visit:</span>
                  <span className="text-[#F8FAFC]">{appointmentData.lastVisit}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-[#94A3B8] text-sm mb-2">Medical History:</p>
                <p className="text-[#F8FAFC] text-sm">{appointmentData.medicalHistory}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPatientRecord(true)}
                className="w-full mt-4 px-4 py-2 bg-[#374151] text-[#F8FAFC] rounded-xl hover:bg-[#4B5563] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Eye size={16} />
                <span>View Full Record</span>
              </motion.button>
            </motion.div>

            {/* Notes Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1E293B] rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#F8FAFC]">Notes</h3>
                {notesSaved && (
                  <span className="text-green-400 text-sm flex items-center space-x-1">
                    <Check size={14} />
                    <span>Saved</span>
                  </span>
                )}
              </div>
              <textarea
                ref={notesTextareaRef}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your consultation notes here..."
                className="w-full h-32 px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveNotes}
                className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Save size={16} />
                <span>Save Notes</span>
              </motion.button>
            </motion.div>

            {/* Prescription Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1E293B] rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
            >
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Prescription</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newPrescription.medicine}
                  onChange={(e) => setNewPrescription({...newPrescription, medicine: e.target.value})}
                  placeholder="Medicine Name"
                  className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                />
                <input
                  type="text"
                  value={newPrescription.dosage}
                  onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                  placeholder="Dosage"
                  className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                />
                <input
                  type="text"
                  value={newPrescription.duration}
                  onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                  placeholder="Duration"
                  className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendPrescription}
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Pill size={16} />
                  <span>Send Prescription</span>
                </motion.button>
              </div>
              
              {/* Sent Prescriptions */}
              {prescriptions.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-[#94A3B8] mb-2">Sent Prescriptions:</h4>
                  <div className="space-y-2">
                    {prescriptions.map((prescription) => (
                      <div key={prescription.id} className="bg-[#374151] rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[#F8FAFC] font-medium">{prescription.medicine}</p>
                            <p className="text-[#94A3B8] text-sm">{prescription.dosage} - {prescription.duration}</p>
                          </div>
                          <span className="text-[#94A3B8] text-xs">{prescription.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Test Recommendation Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1E293B] rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
            >
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Test Recommendations</h3>
              <div className="space-y-3">
                <select
                  value={newTest.type}
                  onChange={(e) => setNewTest({...newTest, type: e.target.value})}
                  className="w-full px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                >
                  <option value="">Select Test Type</option>
                  {testTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <textarea
                  value={newTest.comments}
                  onChange={(e) => setNewTest({...newTest, comments: e.target.value})}
                  placeholder="Additional comments (optional)"
                  className="w-full h-20 px-4 py-2 bg-[#374151] border border-[#4B5563] rounded-xl text-[#F8FAFC] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendTestRecommendation}
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#0F766E] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <TestTube size={16} />
                  <span>Send to Patient</span>
                </motion.button>
              </div>
              
              {/* Sent Test Recommendations */}
              {testRecommendations.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-[#94A3B8] mb-2">Sent Recommendations:</h4>
                  <div className="space-y-2">
                    {testRecommendations.map((test) => (
                      <div key={test.id} className="bg-[#374151] rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[#F8FAFC] font-medium">{test.type}</p>
                            {test.comments && (
                              <p className="text-[#94A3B8] text-sm">{test.comments}</p>
                            )}
                          </div>
                          <span className="text-[#94A3B8] text-xs">{test.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer with Connection Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-4 left-4 right-4 max-w-7xl mx-auto px-6"
      >
        <div className="flex items-center justify-between bg-[#1E293B]/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-[#F8FAFC] text-sm">
              {isConnected ? 'Connected' : 'Reconnecting...'}
            </span>
          </div>
          {isPatientTyping && (
            <div className="flex items-center space-x-2 text-[#94A3B8] text-sm">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-[#94A3B8] rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>Patient is typing...</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Patient Record Modal */}
      <AnimatePresence>
        {showPatientRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPatientRecord(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Record</h2>
                  <button
                    onClick={() => setShowPatientRecord(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                      <p className="text-gray-900 dark:text-white">{appointmentData.patientName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</label>
                      <p className="text-gray-900 dark:text-white">{appointmentData.patientAge} years</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</label>
                      <p className="text-gray-900 dark:text-white">{appointmentData.patientGender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Patient ID</label>
                      <p className="text-gray-900 dark:text-white">{appointmentData.patientId}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Medical History</label>
                    <p className="text-gray-900 dark:text-white mt-1">{appointmentData.medicalHistory}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Visit</label>
                    <p className="text-gray-900 dark:text-white">{appointmentData.lastVisit}</p>
                  </div>
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

export default LiveAppointment
