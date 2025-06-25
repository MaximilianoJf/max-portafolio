import { Disclosure } from "@headlessui/react";
import { ChevronUp } from "lucide-react";
import { jobData } from "../../data/db";

export default function Jobs() {
  return (
    <>
      <h2 className="font-extrabold text-center mt-10 bg-gradient-to-r text-3xl from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent select-none">
        Experiencia Laboral
      </h2>

     <section className="glass-card !mt-10 p-6 sm:p-8 w-full max-w-5xl mx-auto space-y-6">
        {jobData.map((job, i) => (
          <Disclosure key={i}>
            {({ open }) => (
              <div className="bg-neutral-800/40 p-4 rounded-xl shadow">
                <Disclosure.Button className="w-full flex justify-between items-center text-left">
                  <div className="flex items-center gap-4">
                    <img
                      src={job.logo}
                      alt={`Logo ${job.name}`}
                      className="w-14 h-14 rounded bg-white p-1 object-contain"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-300">{job.name}</h3>
                      <p className="text-white">{job.title}</p>
                    </div>
                  </div>
                  <ChevronUp
                    className={`h-5 w-5 text-cyan-300 transform transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="mt-3 text-cyan-100 whitespace-pre-line">
                  {job.description}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </section>
    </>
  );
}
