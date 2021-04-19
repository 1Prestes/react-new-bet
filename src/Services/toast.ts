import { ReactText } from 'react'
import { toast } from 'react-toastify'

type Message = ReactText | undefined

export const showMessage = (type: string, message: string, autoClose?: number): Message => {
  if (type === 'error') return toast.error(message, { autoClose })
  if (type === 'success') return toast.success(message, { autoClose })
}
