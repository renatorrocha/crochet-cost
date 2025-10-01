import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <p className="text-center text-sm text-gray-600">
        Feito com ❤️ por{" "}
        <Link
          className="font-semibold text-rose-500"
          href="https://renatodev.com"
          target="_blank"
        >
          @renatorrocha
        </Link>
      </p>
    </footer>
  );
}
