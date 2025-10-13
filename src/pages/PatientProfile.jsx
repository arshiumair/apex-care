import React from 'react'
import { motion } from 'framer-motion'
import FeatureUnderUpdate from '../components/FeatureUnderUpdate'

const PatientProfile = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FeatureUnderUpdate 
          title="Patient Profile"
          description="Your personal profile management is currently under development. This feature will allow you to update your personal information, medical history, emergency contacts, and preferences."
          features={[
            "Update personal information",
            "Manage medical history",
            "Set emergency contacts",
            "Configure notification preferences",
            "Upload profile picture",
            "Manage privacy settings"
          ]}
          estimatedCompletion="Coming Soon"
        />
      </motion.div>
    </div>
  )
}

export default PatientProfile
