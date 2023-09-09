import NavBar from "@/components/NavBar/NavBar"

export default function Home() {
  return (
    <main>
      <div className="fixed top-0 w-full bg-white z-50">
        <NavBar />
      </div>

      <section className='px-3 pt-5 mt-16 md:flex md:justify-between md:items-start md:w-full md:px-5'>
        <div>
          <h2 className='text-xl font-bold'>Good morning!</h2>
          <p className='text-sm text-gray-500'>You got some task to do. </p>
        </div>        
      </section>
      
    </main>
  )
}
