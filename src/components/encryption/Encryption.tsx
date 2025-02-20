import { motion } from 'framer-motion'
import EncryptionForm from './EncryptionForm'
import PasswordRuleList from './password/PasswordRuleList'
import ProgressList from './progress/ProgressList'

export default function Encryption() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 30,
      }}
      className='pt-8 max-w-[36rem] mx-auto flex flex-col gap-2'
    >
      <EncryptionForm />
      <div className='flex flex-col gap-2'>
        <PasswordRuleList />
        <ProgressList />
      </div>
    </motion.div>
  )
}
