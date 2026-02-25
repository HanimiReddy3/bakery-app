export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} SweetCrumbs Bakery. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
