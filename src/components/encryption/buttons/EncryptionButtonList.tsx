import DecryptionButton from './DecryptionButton'
import EncryptionButton from './EncryptButton'
import ResetButton from './ResetButton'

export default function EncryptionButtonList() {
  return (
    <div className='flex w-full items-center'>
      <EncryptionButton />
      <DecryptionButton />
      <ResetButton />
    </div>
  )
}
