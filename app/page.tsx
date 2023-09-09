import NavBar from "@/components/NavBar/NavBar";
import DatePicker from "@/components/DatePicker/DatePicker";

export default function Home() {
  return (
    <main>
      <div className="fixed top-0 w-full bg-white z-50">
        <NavBar />
      </div>

      <section className='px-3 pt-5 mt-16'>
        <div>
          <h2 className='text-xl font-bold'>Good morning!</h2>
          <p className='text-sm text-gray-500'>You got some task to do. </p>
        </div>        
      </section>

      <section className="mt-5">
        <div>
          <DatePicker />
        </div>
        

      </section>
      
    </main>
  )
}
