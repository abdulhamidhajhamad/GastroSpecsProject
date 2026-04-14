import PortalHeader from '@/components/portal/PortalHeader'

const staff = [
  { initials: 'JV', name: 'Julian Voss', email: 'j.voss@gastrospecs.com', role: 'Administrator', status: 'online', activity: 'JUST NOW' },
  { initials: 'SA', name: 'Sarah Al-Fayed', email: 's.alfayed@gastrospecs.com', role: 'Project Manager', status: 'away', activity: '14 MINS AGO' },
  { initials: 'MC', name: 'Marcus Chen', email: 'm.chen@gastrospecs.com', role: 'Procurement', status: 'online', activity: '3 MINS AGO' },
  { initials: 'ER', name: 'Elena Rodriguez', email: 'e.rodriguez@gastrospecs.com', role: 'Technician', status: 'offline', activity: '2 HOURS AGO' },
  { initials: 'AM', name: 'Ahmed Mansour', email: 'a.mansour@gastrospecs.com', role: 'Procurement', status: 'online', activity: 'ACTIVE' },
]

const roles = [
  { name: 'ADMIN (FULL)', users: '10 users' },
  { name: 'MANAGER', users: '1 users' },
  { name: 'LOGISTICS SPECIALIST', users: '3 users' },
  { name: 'TECHNICAL ENGINEER', users: '4 users' },
]

const statusColor: Record<string, string> = {
  online: 'bg-green-500',
  away: 'bg-yellow-400',
  offline: 'bg-gray-300',
}

export default function SettingsPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-sans font-bold text-2xl text-black">System Settings</h1>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1">Global Configurations and User Management</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              </svg>
              Audit Logs
            </button>
            <button className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-px bg-gray-200 mb-6">
          {[
            { label: 'Total Staff', value: '24', sub: '8 ACTIVE SESSIONS', icon: '👤' },
            { label: 'System Health', value: '99.9%', sub: 'UPTIME LAST 30 DAYS', icon: '⚙️' },
            { label: 'Translations', value: '2,401', sub: 'ENGLISH / ARABIC KEYS', icon: '🌐' },
            { label: 'Security', value: 'Level 4', sub: 'MFA ENFORCEMENT ACTIVE', icon: '🔒' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-5">
              <div className="flex items-start justify-between mb-2">
                <span className="text-gray-300 text-lg">{stat.icon}</span>
              </div>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">{stat.label}</p>
              <p className="font-serif text-2xl font-bold text-black">{stat.value}</p>
              <p className="font-sans text-[9px] text-gray-400 mt-1 uppercase tracking-wide">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="border-b border-gray-200 mb-6">
          <div className="flex items-center gap-0">
            {['Users & Roles', 'Language Management', 'Security & API', 'General'].map((tab, i) => (
              <button key={tab} className={`font-sans text-[10px] tracking-[0.1em] uppercase px-6 py-4 border-b-2 transition-colors ${i === 0 ? 'border-black text-black font-semibold' : 'border-transparent text-gray-400 hover:text-black'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 w-56">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                  <input type="search" placeholder="Filter staff by name or role..." className="bg-transparent font-sans text-[10px] text-black placeholder-gray-400 focus:outline-none w-full" />
                </div>
                <button className="border border-gray-200 font-sans text-[10px] tracking-[0.15em] uppercase text-gray-500 px-3 py-1.5 hover:border-black hover:text-black transition-colors flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  Filter
                </button>
              </div>
              <button className="bg-black text-white font-sans text-[10px] tracking-[0.15em] uppercase px-4 py-1.5 hover:bg-gray-800 transition-colors flex items-center gap-2">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4" /><path d="M16 11 18 13 22 9" />
                </svg>
                Add New Staff
              </button>
            </div>

            <div className="border border-gray-200 overflow-hidden mb-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['Name & Identity', 'Assigned Role', 'Live Status', 'Last Activity', 'Actions'].map((col) => (
                      <th key={col} className="px-5 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {staff.map((member) => (
                    <tr key={member.initials} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <span className="font-sans text-[9px] font-bold text-gray-600">{member.initials}</span>
                          </div>
                          <div>
                            <p className="font-sans text-xs font-semibold text-black">{member.name}</p>
                            <p className="font-sans text-[9px] text-gray-400">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-sans text-[9px] tracking-[0.1em] border border-gray-200 px-2.5 py-1 text-gray-600">{member.role}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${statusColor[member.status]}`} />
                          <span className="font-sans text-[10px] text-gray-500">{member.status}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-sans text-[10px] text-gray-400 uppercase tracking-wide">{member.activity}</td>
                      <td className="px-5 py-4">
                        <button className="text-gray-300 hover:text-black transition-colors font-sans text-sm">···</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                <p className="font-sans text-[10px] text-gray-400">Showing 5 of 24 members</p>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((n) => (
                    <button key={n} className={`w-7 h-7 font-sans text-[10px] ${n === 1 ? 'bg-black text-white' : 'border border-gray-200 text-gray-400 hover:border-black'}`}>{n}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-5">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-2">Active Roles & Permissions</p>
              <p className="font-sans text-[9px] uppercase tracking-wide text-gray-400 mb-5">Define Access Level Policies Across Modules</p>
              <div className="space-y-3">
                {roles.map((role) => (
                  <div key={role.name} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-sans text-xs font-bold text-black">{role.name}</p>
                      <p className="font-sans text-[9px] text-gray-400">Used by {role.users}</p>
                    </div>
                    <button className="font-sans text-[10px] tracking-[0.1em] uppercase text-gray-400 hover:text-black transition-colors border border-gray-200 px-3 py-1.5 hover:border-black">
                      Manage Policy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black p-5">
              <div className="flex items-center gap-2 mb-4">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-semibold">Advanced Security Portal</p>
              </div>
              <p className="font-sans text-[9px] uppercase tracking-wide text-gray-500 mb-5">Restricted to Global Administrators Only</p>

              <div className="border border-gray-700 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <p className="font-sans text-[10px] font-semibold text-white uppercase tracking-wide">Enforce 2FA Protocol</p>
                </div>
                <p className="font-sans text-[9px] text-gray-500 leading-relaxed mb-3">All staff portal users will be required to authenticate via mobile authenticator apps.</p>
                <button className="w-full border border-gray-600 text-white font-sans text-[10px] tracking-[0.15em] uppercase py-2 hover:bg-white hover:text-black transition-colors">Enable Global MFA</button>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-sans text-[10px] text-gray-400 uppercase tracking-wide">Session Timeout (Mins)</p>
                <div className="border border-gray-600 px-4 py-2">
                  <span className="font-sans text-sm font-bold text-white">60</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-sans text-[10px] uppercase tracking-wide text-gray-500">System Operational</span>
        </div>
        <div className="flex items-center gap-6">
          <p className="font-sans text-[9px] text-gray-400">© 2024 GASTROSPECS OPERATIONS. ALL RIGHTS RESERVED.</p>
          {['Terms', 'Privacy'].map((item) => (
            <a key={item} href="#" className="font-sans text-[9px] text-gray-400 hover:text-black uppercase tracking-wide">{item}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
