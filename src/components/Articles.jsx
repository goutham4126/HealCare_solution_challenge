import Image from 'next/image'
import Link from "next/link"

function Articles() {
    const arr=[
        {
            image:"https://www.savinadental.com/wp-content/uploads/2018/10/Do-gums-grow-back-savina-dental-clinics-malta-and-gozo.jpg",
            link:"https://www.medicalnewstoday.com/articles/natural-remedies-for-receding-gums",
            heading:"6 Effective Home Remedies for Receding Gums",
            content:"Studies done in dental clinic in nagpur show that gum recession can be found in people with both good and ...",
        },
        {
            image:"https://images.pexels.com/photos/7927243/pexels-photo-7927243.jpeg?auto=compress&cs=tinysrgb&w=800",
            link:"https://www.helpguide.org/articles/relationships-communication/anger-management.htm",
            heading:"Is your rage consuming you? Try these techniques to diffuse your anger",
            content:"Flying off the handle over trifles can be easy. While family members might put up with your anger management ...",
        },
        {
            image:"https://images.pexels.com/photos/1001897/pexels-photo-1001897.jpeg?auto=compress&cs=tinysrgb&w=800",
            link:"https://www.medicalnewstoday.com/articles/284974",
            heading:"10 tips to prevent diabetes in children",
            content:"Childhood obesity is on the rise due to many factors like fast food, lack of physical activity.Symptoms include ...",
        },
        {
            image:"https://nypost.com/wp-content/uploads/sites/2/2020/06/200611-bald-coronavirus.jpg?quality=75&strip=all",
            link:"https://www.mensjournal.com/style/your-diabolical-follicles-treating-male-pattern-baldness",
            heading:"Tips to Treat Male Pattern Baldness",
            content:"70% men globally suffer from the male pattern of balding and stress only worsens it. A receding hairline ...",
        },
    ]
  return (
    <div className="p-5">
    <h1 className="text-center text-2xl text-teal-600 font-bold">Top health articles</h1>
    <p className="text-center text-sm font-semibold text-slate-500">Trending tips from doctors and health experts</p>
        <div className="flex justify-center mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {
                arr.map((item,index)=>
                <div className="w-88 lg:w-96 rounded-md" key={index} style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                    <Image src={item.image} alt="" width={400} height={100} className="rounded-t-md"/>
                    <div className="m-3">
                        <Link href={item.link} className="mt-2 text-xl font-bold hover:text-gray-600">{item.heading}</Link> 
                        <p className="text-sm text-gray-500">{item.content}</p>
                    </div>
                </div>
                )
            }
            </div>
        </div>
    </div>
  )
}

export default Articles