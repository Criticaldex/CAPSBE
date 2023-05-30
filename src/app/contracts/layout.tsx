import Link from "next/link"

const links = [{
  label: '2022',
  route: '/contracts/2022'
},
{
  label: '2023',
  route: '/contracts/2023'
}]

export default async function ContractsLayout({ children }:any) {

  return (
    <html>
      <head>
        <title>Indicadors Contracte</title>
      </head>
      <body>
        <header>
          <nav>
            <ul>
              {links.map(({ label, route }) => (
                <li key={route}>
                  <Link href={route}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            {children}
          </nav>
        </header>
      </body>
    </html>
  )
}
