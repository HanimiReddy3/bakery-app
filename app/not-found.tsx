import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 rounded-full p-6">
            <AlertCircle className="w-12 h-12 text-orange-600" />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </p>

        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It seems this bread didn't rise quite right!
        </p>

        <div className="space-y-3">
          <Link href="/" className="block">
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Back to Home
            </Button>
          </Link>

          <Link href="/products" className="block">
            <Button variant="outline" className="w-full">
              Browse Products
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-4xl">🍞</div>
      </div>
    </div>
  );
}
