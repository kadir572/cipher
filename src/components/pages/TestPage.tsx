import { toast } from 'sonner'
import { Button } from '../ui/button'
import { invoke } from '@tauri-apps/api/core'

export default function TestPage() {
  const handleClick = async () => {
    toast.promise(
      () =>
        invoke('learn', {
          filePath: '/home/kadirkaradavut/Downloads/test.pdf',
        }),
      {
        loading: 'Encrypting...',
        success: message => message as string,
        error: message => message as string,
      }
    )
    // try {
    //   const message = (await invoke('learn', {
    //     filePath: '/home/kadirkaradavut/Downloads/test.df',
    //   })) as string
    //   if (message) {
    //     toast.success(message)
    //   }
    // } catch (e) {
    //   const message = e as string
    //   toast.error(message)
    // }
  }
  return (
    <div>
      <h1>Test Page</h1>
      <Button onClick={handleClick}>Toast rust message</Button>
    </div>
  )
}
