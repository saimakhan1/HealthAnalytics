"use client";

import { useRef, useState } from "react";
import { Camera, Eye, EyeOff, Save, Stethoscope, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DoctorProfile() {
  const { user, refreshUser } = useAuth();

  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessageType("error");
      setMessage("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessageType("error");
      setMessage("Image must be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageElement = new Image();

      imageElement.onload = () => {
        const canvas = document.createElement("canvas");

        const maxSize = 500;

        let width = imageElement.width;
        let height = imageElement.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          setMessageType("error");
          setMessage("Unable to process the image.");
          return;
        }

        context.drawImage(imageElement, 0, 0, width, height);

        const compressedImage = canvas.toDataURL("image/jpeg", 0.8);

        setImage(compressedImage);
        setMessage("");
        setMessageType("");
      };

      imageElement.src = reader.result;
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const handleRemoveImage = () => {
    setImage("");
    setMessage("");
    setMessageType("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const changingPassword = currentPassword || newPassword || confirmPassword;

    if (changingPassword) {
      if (!currentPassword) {
        setMessageType("error");
        setMessage("Please enter your current password.");
        return;
      }

      if (!newPassword) {
        setMessageType("error");
        setMessage("Please enter your new password.");
        return;
      }

      if (newPassword.length < 6) {
        setMessageType("error");
        setMessage("New password must be at least 6 characters.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setMessageType("error");
        setMessage("New passwords do not match.");
        return;
      }
    }

    try {
      setSaving(true);

      const response = await fetch("/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          image,
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessageType("error");
        setMessage(data.message || "Unable to update profile.");
        return;
      }

      await refreshUser();

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessageType("success");
      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);

      setMessageType("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#a71930]">DOCTOR PROFILE</p>

        <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
          Profile Settings
        </h1>

        <p className="mt-2 text-gray-500">Manage your personal information.</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-[#5c0b1b] to-[#a71930] p-8 text-white">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white/15 text-3xl font-extrabold">
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  name?.charAt(0)?.toUpperCase() || "D"
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#a71930] shadow-md transition hover:scale-105"
                title="Change profile picture"
              >
                <Camera size={16} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Dr. {name || user?.name}</h2>

              <p className="mt-1 capitalize text-white/70">
                {user?.role} account
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          {message && (
            <div
              className={
                messageType === "success"
                  ? "rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
                  : "rounded-xl bg-[#fff1f3] px-4 py-3 text-sm font-medium text-[#8f1730]"
              }
            >
              {message}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Profile Picture
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl border border-[#a71930] px-4 py-2.5 font-semibold text-[#a71930] transition hover:bg-[#fff1f3]"
              >
                <Camera size={18} />
                {image ? "Change Picture" : "Add Picture"}
              </button>

              {image && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={18} />
                  Remove Picture
                </button>
              )}
            </div>

            <p className="mt-2 text-xs text-gray-400">
              JPG, PNG or other image formats. Maximum 5 MB.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#a71930] focus:ring-4 focus:ring-[#fff1f3]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
            />
          </div>

          <div className="rounded-xl bg-[#fff1f3] p-4">
            <div className="flex items-center gap-3">
              <Stethoscope className="text-[#a71930]" size={21} />

              <div>
                <p className="text-xs text-gray-500">Account Type</p>

                <p className="font-bold capitalize text-[#681225]">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-bold text-[#5c0b1b]">
              Change Password
            </h3>

            <p className="mb-5 mt-1 text-sm text-gray-500">
              Leave these fields empty if you don't want to change your
              password.
            </p>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Current Password
              </label>

              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="Enter current password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-[#a71930] focus:ring-4 focus:ring-[#fff1f3]"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#a71930]"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-[#a71930] focus:ring-4 focus:ring-[#fff1f3]"
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#a71930]"
                >
                  {showNewPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Confirm New Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm new password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-[#a71930] focus:ring-4 focus:ring-[#fff1f3]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#a71930]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#a71930] px-6 py-3 font-bold text-white transition hover:bg-[#7f1025] disabled:opacity-60"
          >
            <Save size={18} />

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
