
import React, { useState, useEffect, useCallback } from "react";
import { Therapist } from "@/entities/Therapist";
import { InvokeLLM } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Globe, Star, DollarSign, Clock, Search, Filter, Navigation } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";

export default function TherapistsPage() {
  const [therapists, setTherapists] = useState([]);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [maxDistance, setMaxDistance] = useState(50); // Increased default distance to 50 km
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Center of India

  const specialties = [
    "all", "anxiety", "depression", "trauma", "relationships",
    "addiction", "eating disorders", "adhd", "family therapy", "couples therapy", "stress management" // Added "stress management"
  ];

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setMapCenter([location.lat, location.lng]);
        },
        (error) => {
          console.log("Geolocation error:", error);
          // Fallback to IP-based location or default (already set to India's center)
        }
      );
    }
  };

  const generateSampleTherapists = async () => {
    const sampleData = [
      {
        name: "Dr. Anjali Sharma",
        credentials: "PhD, Clinical Psychologist (RCI Licensed)",
        specialties: ["anxiety", "depression", "stress management"],
        bio: "Specializing in Cognitive Behavioral Therapy (CBT) for young adults. Helps clients navigate academic pressure and career uncertainty.",
        location: {
          address: "101, Wellness Clinic, Bandra West",
          city: "Mumbai",
          state: "MH",
          zip: "400050",
          lat: 19.0760,
          lng: 72.8777
        },
        contact: {
          phone: "+91 98765 43210",
          email: "dr.anjali@soulsync.in"
        },
        insurance_accepted: ["HDFC Ergo", "ICICI Lombard", "Bajaj Allianz"],
        rating: 4.9,
        session_fee: 2500,
        availability: {
          online: true,
          in_person: true,
          languages: ["English", "Hindi", "Marathi"]
        }
      },
      {
        name: "Rohan Desai",
        credentials: "M.Phil, Counseling Psychologist",
        specialties: ["relationships", "family therapy", "addiction"],
        bio: "Experienced in helping Gen Z with relationship conflicts and addiction issues using a person-centered approach. 8+ years of practice.",
        location: {
          address: "A-23, Mindful Living Center, Koramangala",
          city: "Bengaluru",
          state: "KA",
          zip: "560034",
          lat: 12.9279,
          lng: 77.6271
        },
        contact: {
          phone: "+91 87654 32109",
          email: "rohan.desai@soulsync.in"
        },
        insurance_accepted: ["Star Health", "Max Bupa"],
        rating: 4.8,
        session_fee: 1800,
        availability: {
          online: true,
          in_person: true,
          languages: ["English", "Kannada"]
        }
      },
      {
        name: "Dr. Priya Verma",
        credentials: "MD, Psychiatrist",
        specialties: ["depression", "adhd", "eating disorders"],
        bio: "A psychiatrist with expertise in medication management and therapy for severe depression and ADHD. Focuses on a holistic treatment plan.",
        location: {
          address: "Suite 5, Healing Hub, Saket",
          city: "New Delhi",
          state: "DL",
          zip: "110017",
          lat: 28.5273,
          lng: 77.2177
        },
        contact: {
          phone: "+91 76543 21098",
          email: "dr.priya@soulsync.in",
          website: "www.drpriyaverma.com"
        },
        insurance_accepted: ["Aetna", "Cigna TTK"],
        rating: 4.9,
        session_fee: 3000,
        availability: {
          online: true,
          in_person: true,
          languages: ["English", "Hindi"]
        }
      }
    ];

    for (const therapistData of sampleData) {
      await Therapist.create(therapistData);
    }
  };

  const loadTherapists = useCallback(async () => {
    setIsLoading(true);
    try {
      // First try to load existing therapists
      let existingTherapists = await Therapist.list();

      // If no therapists exist, generate some sample data
      if (existingTherapists.length === 0) {
        await generateSampleTherapists();
        existingTherapists = await Therapist.list();
      }

      setTherapists(existingTherapists);
    } catch (error) {
      console.error("Error loading therapists:", error);
    }
    setIsLoading(false);
  }, []); // loadTherapists does not depend on any external changing values

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Wrap filterTherapists in useCallback to ensure its stability across renders
  const filterTherapists = useCallback(() => {
    let filtered = [...therapists];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(therapist =>
        therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        therapist.specialties.some(specialty =>
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        therapist.location.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Specialty filter
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(therapist =>
        therapist.specialties.includes(selectedSpecialty)
      );
    }

    // Distance filter (if user location available)
    if (userLocation) {
      filtered = filtered.filter(therapist => {
        const distance = calculateDistance(
          userLocation.lat, userLocation.lng,
          therapist.location.lat, therapist.location.lng
        );
        return distance <= maxDistance; // maxDistance is already in km
      });

      // Sort by distance
      filtered.sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation.lat, userLocation.lng,
          a.location.lat, a.location.lng
        );
        const distanceB = calculateDistance(
          userLocation.lat, userLocation.lng,
          b.location.lat, b.location.lng
        );
        return distanceA - distanceB;
      });
    }

    setFilteredTherapists(filtered);
  }, [therapists, searchQuery, selectedSpecialty, maxDistance, userLocation]); // Dependencies for useCallback

  useEffect(() => {
    getUserLocation();
    loadTherapists();
  }, [loadTherapists]); // loadTherapists is now memoized

  // This useEffect now depends on the memoized filterTherapists function.
  useEffect(() => {
    filterTherapists();
  }, [filterTherapists]); // This ensures it re-runs when filterTherapists (and thus its dependencies) change

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl"
            >
              {/* Panda Logo SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                {/* White head */}
                <circle cx="12" cy="12" r="10" fill="white"/>
                {/* Black ears */}
                <circle cx="7" cy="6" r="3" fill="#000000"/>
                <circle cx="17" cy="6" r="3" fill="#000000"/>
                {/* Black eye patches */}
                <path d="M10 11C10 9.89543 9.10457 9 8 9C6.89543 9 6 9.89543 6 11C6 12.1046 6.89543 13 8 13C9.10457 13 10 12.1046 10 11Z" fill="#000000"/>
                <path d="M18 11C18 9.89543 17.1046 9 16 9C14.8954 9 14 9.89543 14 11C14 12.1046 14.8954 13 16 13C17.1046 13 18 12.1046 18 11Z" fill="#000000"/>
                {/* Nose */}
                <circle cx="12" cy="14" r="1" fill="#000000"/>
                {/* Mouth */}
                <path d="M12 15C12 15 11 16 10 16L12 17L14 16C13 16 12 15 12 15Z" fill="#000000"/>
              </svg>
              {/* End Panda Logo SVG */}
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Therapist
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome to SoulSync! Connect with qualified mental health professionals near you. All therapists are verified and specialize in Gen Z mental health needs.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name, specialty, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-emerald-200 focus:border-emerald-400 bg-white/90"
              />
            </div>

            <div className="flex gap-4">
              <select
                value={selectedSpecialty}
