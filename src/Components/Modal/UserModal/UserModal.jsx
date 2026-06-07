import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function UserModal({ setIsOpen, isOpen }) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={() => setIsOpen(false)} // 🟢 ফিক্সড: বাইরে ক্লিক করলে বা এসকেপ (Esc) চাপলে মোডাল অফ হবে
    >
      {/* ব্যাকড্রপ ওভারলে (মোডালের পেছনের অংশ আবছা কালো করার জন্য) */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm md:backdrop-blur-none transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl duration-300 ease-out data-[closed]:transform data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {/* 🟢 নোট: bg-white/5 সল্ট টেক্সটকে রিড করা কঠিন করছিল, তাই সলিড bg-white ও ডার্ক টেক্সট দেওয়া হলো */}
            <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
              User Profile Settings
            </DialogTitle>

            <p className="mt-2 text-sm text-gray-500">
              Your payment has been successfully submitted. We’ve sent you an
              email with all of the details of your order.
            </p>

            <div className="mt-4">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none"
                onClick={() => setIsOpen(false)} // 🟢 ফিক্সড: বাটনে ক্লিক করলে ফলস হবে
              >
                Got it, thanks!
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
