import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const professionOptions = [
  'Self Employed',
  'Business Owner',
  'Corporate Professional',
  'Researcher / Academic',
  'Student',
  'Retired',
  'Others',
];

const collaborationOptions = [
  'Technology Partnership',
  'Research Collaboration',
  'Industry / Corporate Partnership',
  'Manufacturing / Supply Chain',
  'Government / Policy Engagement',
  'Mentorship',
  'Media / Outreach',
  'Other',
];

const domainOptions = [
  'Space & Aerospace',
  'AgriTech',
  'Climate & Sustainability',
  'AI / ML',
  'Robotics & Automation',
  'IoT & Smart Systems',
  'Biotechnology',
  'Advanced Manufacturing',
  'Smart Cities & Mobility',
  'Education & Research',
  'Other',
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  linkedin: string;
  profession: string;
  professionOther: string;
  collaborationTypes: string[];
  collaborationOther: string;
  domains: string[];
  domainOther: string;
  hasCollaborated: string;
  previousCollaborations: string;
  valueProposition: string;
  interestedInMentoring: string;
}

const Partner = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    linkedin: '',
    profession: '',
    professionOther: '',
    collaborationTypes: [],
    collaborationOther: '',
    domains: [],
    domainOther: '',
    hasCollaborated: '',
    previousCollaborations: '',
    valueProposition: '',
    interestedInMentoring: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.linkedin.trim()) newErrors.linkedin = 'LinkedIn URL is required';
    if (!formData.profession) newErrors.profession = 'Please select your profession';
    if (formData.collaborationTypes.length === 0) newErrors.collaborationTypes = ['Select at least one option'] as any;
    if (formData.domains.length === 0) newErrors.domains = ['Select at least one domain'] as any;
    if (!formData.hasCollaborated) newErrors.hasCollaborated = 'Please answer this question';
    if (!formData.valueProposition.trim()) newErrors.valueProposition = 'This field is required';
    if (!formData.interestedInMentoring) newErrors.interestedInMentoring = 'Please answer this question';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '0bd4da41-171d-49da-b587-c3a131d7e608',
          subject: `Partner Inquiry from ${formData.fullName}`,
          from_name: 'Vidhai Partner Form',
          ...formData,
          collaborationTypes: formData.collaborationTypes.join(', '),
          domains: formData.domains.join(', '),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckboxChange = (field: 'collaborationTypes' | 'domains', value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen bg-background text-foreground">
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 50%, hsl(220 30% 8%) 0%, hsl(220 20% 4%) 70%)',
            }}
          />
        </div>
        <Navbar />
        <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-muted-foreground mb-8">
              We've received your partnership inquiry. Our team will review your submission and reach out if there's a fit.
            </p>
            <Link to="/">
              <Button variant="hero" size="lg">
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, hsl(220 30% 8%) 0%, hsl(220 20% 4%) 70%)',
          }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </motion.div>

          {/* Page Header */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Partner With Us
            </h1>
            <p className="text-muted-foreground">
              Join our ecosystem of innovators, mentors, and industry leaders.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Basic Information */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={errors.fullName ? 'border-destructive' : ''}
                    placeholder="Your full name"
                  />
                  {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email ID *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'border-destructive' : ''}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="city">Location (City) *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={errors.city ? 'border-destructive' : ''}
                    placeholder="Your city"
                  />
                  {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                </div>

                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile URL *</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className={errors.linkedin ? 'border-destructive' : ''}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                  {errors.linkedin && <p className="text-sm text-destructive mt-1">{errors.linkedin}</p>}
                </div>
              </div>
            </section>

            {/* Professional Background */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Professional Background
              </h2>

              <div>
                <Label>Profession *</Label>
                <div className="mt-3 space-y-2">
                  {professionOptions.map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="profession"
                        value={option}
                        checked={formData.profession === option}
                        onChange={(e) => handleInputChange('profession', e.target.value)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.profession && <p className="text-sm text-destructive mt-2">{errors.profession}</p>}
                
                <AnimatePresence>
                  {formData.profession === 'Others' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3"
                    >
                      <Input
                        value={formData.professionOther}
                        onChange={(e) => handleInputChange('professionOther', e.target.value)}
                        placeholder="Please specify your profession"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Partnership Interest */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Partnership Interest
              </h2>

              <div>
                <Label>How would you like to collaborate with us? *</Label>
                <div className="mt-3 space-y-2">
                  {collaborationOptions.map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox
                        checked={formData.collaborationTypes.includes(option)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange('collaborationTypes', option, checked as boolean)
                        }
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.collaborationTypes && (
                  <p className="text-sm text-destructive mt-2">{errors.collaborationTypes}</p>
                )}
                
                <AnimatePresence>
                  {formData.collaborationTypes.includes('Other') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3"
                    >
                      <Input
                        value={formData.collaborationOther}
                        onChange={(e) => handleInputChange('collaborationOther', e.target.value)}
                        placeholder="Please specify"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Label>Industries / Domains of Interest *</Label>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {domainOptions.map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox
                        checked={formData.domains.includes(option)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange('domains', option, checked as boolean)
                        }
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.domains && <p className="text-sm text-destructive mt-2">{errors.domains}</p>}
                
                <AnimatePresence>
                  {formData.domains.includes('Other') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3"
                    >
                      <Input
                        value={formData.domainOther}
                        onChange={(e) => handleInputChange('domainOther', e.target.value)}
                        placeholder="Please specify"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Experience & Intent */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Experience & Intent
              </h2>

              <div>
                <Label>Have you collaborated with startups or research organizations before? *</Label>
                <div className="mt-3 flex gap-6">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="hasCollaborated"
                        value={option}
                        checked={formData.hasCollaborated === option}
                        onChange={(e) => handleInputChange('hasCollaborated', e.target.value)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.hasCollaborated && <p className="text-sm text-destructive mt-2">{errors.hasCollaborated}</p>}
                
                <AnimatePresence>
                  {formData.hasCollaborated === 'Yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3"
                    >
                      <Textarea
                        value={formData.previousCollaborations}
                        onChange={(e) => handleInputChange('previousCollaborations', e.target.value)}
                        placeholder="Briefly describe your previous collaborations"
                        rows={3}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Label htmlFor="valueProposition">How do you see yourself adding value to this partnership? *</Label>
                <Textarea
                  id="valueProposition"
                  value={formData.valueProposition}
                  onChange={(e) => handleInputChange('valueProposition', e.target.value)}
                  className={`mt-2 ${errors.valueProposition ? 'border-destructive' : ''}`}
                  placeholder="Briefly describe your expertise, resources, or interest"
                  rows={4}
                />
                {errors.valueProposition && (
                  <p className="text-sm text-destructive mt-1">{errors.valueProposition}</p>
                )}
              </div>
            </section>

            {/* Mentorship Option */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Mentorship
              </h2>

              <div>
                <Label>Would you be interested in participating as a mentor or advisor? *</Label>
                <div className="mt-3 flex gap-6">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="interestedInMentoring"
                        value={option}
                        checked={formData.interestedInMentoring === option}
                        onChange={(e) => handleInputChange('interestedInMentoring', e.target.value)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.interestedInMentoring && (
                  <p className="text-sm text-destructive mt-2">{errors.interestedInMentoring}</p>
                )}
                
                <AnimatePresence>
                  {formData.interestedInMentoring === 'Yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <a
                        href="mailto:connect@vidhai.io?subject=Mentor Application"
                        className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4"
                      >
                        <span>Sign up here – Mentor Form</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Submit Button */}
            <motion.div
              className="pt-6 sticky bottom-4 md:static"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Partner;
