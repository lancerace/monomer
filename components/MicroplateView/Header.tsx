import { MicroplateWithMeasurements } from "@/types";
import Link from "next/link";

interface HeaderProps {
  microplate: MicroplateWithMeasurements;
}

const Header = ({ microplate }: HeaderProps) => {
  return (
    <div className="text-center">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Microplates
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-white mb-3">
        Culture Confluency Tracker
      </h1>
      <h2 className="text-2xl font-semibold text-blue-100 mb-4">{microplate.name}</h2>
      <p className="text-blue-100/90 text-lg">
        Monitor cell growth and confluency across your microplate wells
      </p>
    </div>
  );
};

export default Header;
