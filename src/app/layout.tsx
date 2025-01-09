
import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'GradeSync - Grade Calculator',
  description: 'Grade Calculator made by a student, and made for students.',
}
 

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=SomeFontFamily&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className='font-sometype theme-default'>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root" className="w-full h-full overflow-x-hidden p-3">{children}</div>
            </body>
        </html>
    );
}
