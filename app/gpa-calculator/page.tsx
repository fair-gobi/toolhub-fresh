"use client"
import { useState, useEffect } from "react"

const grades: any = {"A+":4.0,"A":3.6,"B+":3.2,"B":2.8,"C+":2.4,"C":2.0,"D+":1.6,"D":1.2,"E":0.8,"NG":0}

const presets = {
  see: [{n:"English",c:4,g:"A"},{n:"Nepali",c:4,g:"B+"},{n:"Math",c:4,g:"A"},{n:"Science",c:4,g:"B+"},{n:"Social",c:4,g:"A"},{n:"Opt Math",c:4,g:"B"}],
  plus2: [{n:"English",c:3,g:"A"},{n:"Nepali",c:3,g:"B+"},{n:"Physics",c:5,g:"A"},{n:"Chemistry",c:5,g:"B+"},{n:"Math",c:5,g:"A+"}],
  bachelor: [{n:"Subject 1",c:3,g:"A"},{n:"Subject 2",c:3,g:"B+"},{n:"Subject 3",c:3,g:"A"}]
}

export default function GPACalculator() {
  const [subs, setSubs] = useState(presets.see)
  const [semester, setSemester] = useState("SEE")
  const [saved, setSaved] = useState<any[]>([])

  useEffect(() => {
    const s = localStorage.getItem('gpa-saved')
    if (s) setSaved(JSON.parse(s))
  }, [])

  const update = (i: number, field: string, val: any) => {
    const a = [...subs]; (a[i] as any)[field] = field==='c'? +val : val; setSubs(a)
  }
  const add = () => setSubs([...subs, {n:"",c:3,g:"A"}])
  const remove = (i: number) => setSubs(subs.filter((_,idx) => idx!== i))

  const total = subs.reduce((s,x)=>s+x.c,0)
  const points = subs.reduce((s,x)=>s+grades[x.g]*x.c,0)
  const gpa = total? (points/total).toFixed(2) : "0.00"
  const percent = (parseFloat(gpa)*25).toFixed(1)
  const division = parseFloat(gpa) >= 3.6? "Distinction" : parseFloat(gpa) >= 2.8? "First Division" : parseFloat(gpa) >= 2.0? "Second" : parseFloat(gpa) >= 1.6? "Third" : "Fail"

  const saveGPA = () => {
    const entry = { date: new Date().toLocaleDateString(), semester, gpa, subs }
    const newSaved = [entry,...saved].slice(0,5)
    setSaved(newSaved)
    localStorage.setItem('gpa-saved', JSON.stringify(newSaved))
  }

  const loadPreset = (key: keyof typeof presets) => {
    setSubs(presets[key])
    setSemester(key.toUpperCase())
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Nepal GPA Calculator</h1>
      <p className="text-gray-600 mb-6">SEE, +2, Bachelor — NEB, TU, PU grading. Save your results.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => loadPreset('see')} className={`px-4 py-2 rounded-lg ${semester==='SEE'?'bg-blue-600 text-white':'bg-gray-100'}`}>SEE (Grade 10)</button>
        <button onClick={() => loadPreset('plus2')} className={`px-4 py-2 rounded-lg ${semester==='PLUS2'?'bg-blue-600 text-white':'bg-gray-100'}`}>+2 Science</button>
        <button onClick={() => loadPreset('bachelor')} className={`px-4 py-2 rounded-lg ${semester==='BACHELOR'?'bg-blue-600 text-white':'bg-gray-100'}`}>Bachelor</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-2 p-3 bg-gray-50 text-xs font-medium uppercase">
              <div className="col-span-5">Subject</div>
              <div className="col-span-2">Credit</div>
              <div className="col-span-3">Grade</div>
              <div className="col-span-2"></div>
            </div>
            {subs.map((s,i) => (
              <div key={i} className="grid grid-cols-12 gap-2 p-2 border-t items-center">
                <input value={s.n} onChange={e=>update(i,'n',e.target.value)} className="col-span-5 p-2 border rounded" placeholder="Subject" />
                <input type="number" value={s.c} onChange={e=>update(i,'c',e.target.value)} className="col-span-2 p-2 border rounded" min="1" max="6" />
                <select value={s.g} onChange={e=>update(i,'g',e.target.value)} className="col-span-3 p-2 border rounded">
                  {Object.keys(grades).map(g => <option key={g}>{g} ({grades[g]})</option>)}
                </select>
                <button onClick={()=>remove(i)} className="col-span-2 text-red-600 text-sm hover:underline">Remove</button>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={add} className="text-blue-600 font-medium">+ Add Subject</button>
            <button onClick={saveGPA} className="ml-auto bg-green-600 text-white px-4 py-2 rounded-lg">Save Result</button>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-8 sticky top-6">
            <div className="text-sm opacity-90">{semester}</div>
            <div className="text-6xl font-bold mt-1">{gpa}</div>
            <div className="opacity-90">GPA out of 4.0</div>
            <div className="mt-6 space-y-2 text-sm border-t border-white/20 pt-4">
              <div className="flex justify-between"><span>Percentage</span><span className="font-bold">{percent}%</span></div>
              <div className="flex justify-between"><span>Credits</span><span className="font-bold">{total}</span></div>
              <div className="flex justify-between"><span>Division</span><span className="font-bold">{division}</span></div>
            </div>
          </div>

          {saved.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold mb-2 text-sm">Saved Results</h3>
              {saved.map((s,i) => (
                <div key={i} className="text-xs py-1 flex justify-between">
                  <span>{s.semester} • {s.date}</span>
                  <span className="font-bold">{s.gpa}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
