'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'

export async function addBookmark(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const url = formData.get('url') as string

  if (!title || !url) return

  const { data, error } = await supabase.from('bookmarks').insert({
    title,
    url,
    user_id: user.id,
  }).select()

  console.log('Insert result:', { data, error })

  if (error) {
    console.error('Insert error:', error)
  }

  revalidatePath('/dashboard')
}

export async function deleteBookmark(bookmarkId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  await supabase
    .from('bookmarks')
    .delete()
    .match({ id: bookmarkId, user_id: user.id })

  revalidatePath('/dashboard')
}
