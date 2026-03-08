import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAboutSection } from '@/lib/content'

export default async function HomePage() {
  const [bio, professional, personal] = await Promise.all([
    getAboutSection('bio'),
    getAboutSection('professional'),
    getAboutSection('personal'),
  ])

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-5">
      <Header />

      <h1 className="text-5xl font-normal my-8">Nithin Seshadri</h1>

      <main className="mb-24">
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-2.5">ABOUT ME</h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-2.5">PROFESSIONAL</h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: professional }}
          />
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-2.5">PERSONAL</h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: personal }}
          />
        </section>

        <Footer />
      </main>
    </div>
  )
}
