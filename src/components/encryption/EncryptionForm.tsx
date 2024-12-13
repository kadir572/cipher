import DeleteOriginalSwitch from './buttons/DeleteOriginalSwitch'
import EncryptionButtonList from './buttons/EncryptionButtonList'
import EncryptionFileUploader from './EncryptionFileUploader'
import EncryptionPasswordInput from './password/EncryptionPasswordInput'

export default function EncryptionForm() {
  return (
    <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <EncryptionFileUploader />
        <EncryptionPasswordInput />
      </div>

      <DeleteOriginalSwitch />

      <EncryptionButtonList />
    </form>
  )
}
