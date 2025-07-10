"use client";
import { useState } from "react";

interface RepositoryApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

interface FormData {
  githubUsername: string;
  contactInfo: string;
  projectName: string;
  repoLinks: string[];
  productionAppLink: string;
  networksSupported: string;
  superfluidDescription: string;
}

export default function RepositoryApplicationForm({
  isOpen,
  onClose,
  onSuccess,
  onError,
}: RepositoryApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    githubUsername: "",
    contactInfo: "",
    projectName: "",
    repoLinks: [""],
    productionAppLink: "",
    networksSupported: "",
    superfluidDescription: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRepoLinksChange = (index: number, value: string) => {
    const newRepoLinks = [...formData.repoLinks];
    newRepoLinks[index] = value;
    setFormData((prev) => ({
      ...prev,
      repoLinks: newRepoLinks,
    }));
  };

  const addRepoLink = () => {
    setFormData((prev) => ({
      ...prev,
      repoLinks: [...prev.repoLinks, ""],
    }));
  };

  const removeRepoLink = (index: number) => {
    if (formData.repoLinks.length > 1) {
      const newRepoLinks = formData.repoLinks.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        repoLinks: newRepoLinks,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the API payload according to the expected format
      const payload = {
        applicantGithubUsername: formData.githubUsername,
        applicantContact: formData.contactInfo,
        projectName: formData.projectName,
        githubRepoLinks: formData.repoLinks.filter(
          (link) => link.trim() !== ""
        ),
        productionAppLink: formData.productionAppLink,
        networksSupported: formData.networksSupported,
        superfluidIntegrationDescription: formData.superfluidDescription,
      };

      console.log("Submitting application:", payload);

      // Call the API
      const response = await fetch("/v1/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log("Application submitted successfully:", result);

      // Reset form and close modal on success
      setFormData({
        githubUsername: "",
        contactInfo: "",
        projectName: "",
        repoLinks: [""],
        productionAppLink: "",
        networksSupported: "",
        superfluidDescription: "",
      });

      // Show success message before closing
      onSuccess?.(
        "Application submitted successfully! We'll review your submission and get back to you soon."
      );

      // Close form after a short delay to allow toast to appear
      setTimeout(() => {
        onClose();
      }, 100);
    } catch (error) {
      console.error("Error submitting form:", error);
      onError?.(
        "Error submitting application. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.githubUsername.trim() !== "" &&
      formData.contactInfo.trim() !== "" &&
      formData.projectName.trim() !== "" &&
      formData.repoLinks.some((link) => link.trim() !== "") &&
      formData.productionAppLink.trim() !== "" &&
      formData.networksSupported.trim() !== "" &&
      formData.superfluidDescription.trim() !== ""
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-purple-500/30 w-full max-w-4xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Apply for SUP Rewards
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* GitHub Profile */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your GitHub Profile *
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Please provide your GitHub username or profile URL
              </p>
              <div className="relative">
                <input
                  type="text"
                  value={formData.githubUsername}
                  onChange={(e) =>
                    handleInputChange("githubUsername", e.target.value)
                  }
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="username or https://github.com/username"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Information *
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Please provide your Email or Telegram for follow-up
                communication
              </p>
              <input
                type="text"
                value={formData.contactInfo}
                onChange={(e) =>
                  handleInputChange("contactInfo", e.target.value)
                }
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                placeholder="your@email.com or @telegram_username"
                required
              />
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) =>
                  handleInputChange("projectName", e.target.value)
                }
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                placeholder="Your Project Name"
                required
              />
            </div>

            {/* GitHub Repository Links */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Repository Links *
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Share the GitHub repositories for your project (you can add
                multiple repos if needed)
              </p>
              <div className="space-y-3">
                {formData.repoLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={link}
                        onChange={(e) =>
                          handleRepoLinksChange(index, e.target.value)
                        }
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                        placeholder="https://github.com/owner/repository"
                        required={index === 0}
                      />
                    </div>
                    {formData.repoLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRepoLink(index)}
                        className="px-3 py-3 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRepoLink}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                >
                  + Add another repository
                </button>
              </div>
            </div>

            {/* Live Project URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Live Project URL *
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Share the link where users can access and try your project live
              </p>
              <div className="relative">
                <input
                  type="text"
                  value={formData.productionAppLink}
                  onChange={(e) =>
                    handleInputChange("productionAppLink", e.target.value)
                  }
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="https://your-app.com"
                  required
                />
              </div>
            </div>

            {/* Networks Supported */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Networks Supported *
              </label>
              <input
                type="text"
                value={formData.networksSupported}
                onChange={(e) =>
                  handleInputChange("networksSupported", e.target.value)
                }
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                placeholder="e.g., Ethereum, Optimism, Base, etc."
                required
              />
            </div>

            {/* Description of Superfluid Integration */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description of Superfluid Integration *
              </label>
              <div className="mb-3 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-200 mb-2">
                  <strong>To be eligible, projects must:</strong>
                </p>
                <ol className="text-sm text-blue-200 list-decimal list-inside space-y-1">
                  <li>Be live in a production environment</li>
                  <li>
                    Use Superfluid protocol and/or Super Tokens in at least one
                    core feature
                  </li>
                  <li>
                    Include substantial new development if the applying project
                    is a fork
                  </li>
                </ol>
              </div>
              <textarea
                value={formData.superfluidDescription}
                onChange={(e) =>
                  handleInputChange("superfluidDescription", e.target.value)
                }
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none h-32 resize-vertical"
                placeholder="Describe how your project integrates with Superfluid protocol, including specific features and implementation details..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-600/20 text-gray-300 border border-gray-600/30 rounded-lg hover:bg-gray-600/30 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`px-6 py-3 font-medium bg-gradient-to-r from-[#004FFF] to-[#8C00FF] text-white rounded-[6px] transition-all duration-200 ${
                  isFormValid() && !isSubmitting
                    ? "opacity-100 cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
