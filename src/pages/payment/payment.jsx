import {
  ArrowLeft,
  Calendar,
  Car,
  CreditCard,
  DollarSign,
  Phone,
  Wallet,
} from "lucide-react";
import { useState } from "react";

// Import our new components
import CampusRideFooter from "../../components/CampusRideFooter";
import CampusRideHeader from "../../components/CampusRideHeader";
import FareBreakdown from "./FareBreakdown";
import PaymentHistory from "./PaymentHistory";
import PaymentMethodSelection from "./PaymentMethodSelection";
import PaymentMethodsManagement from "./PaymentMethodsManagement";
import PaymentModals from "./PaymentModals";
import RideDetailsCard from "./RideDetailsCard";

export default function RidePaymentPage() {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash1");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [addPaymentType, setAddPaymentType] = useState("mobile"); // 'mobile' or 'card'
  const [editingMethod, setEditingMethod] = useState(null);
  const [tipAmount, setTipAmount] = useState(0);

  const [newPayment, setNewPayment] = useState({
    phoneNumber: "",
    provider: "bkash",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "wallet",
      type: "wallet",
      name: "CampusRide Wallet",
      balance: 485.5,
      icon: Wallet,
      recommended: true,
    },
    {
      id: "cash1",
      type: "cash",
      name: "Cash Payment",
      description: "Pay with cash directly to driver",
      icon: DollarSign,
      color: "bg-green-600",
    },
    {
      id: "bkash1",
      type: "mobile",
      name: "bKash",
      provider: "bkash",
      number: "+880 1712-345678",
      icon: Phone,
      color: "bg-pink-500",
    },
    {
      id: "nagad1",
      type: "mobile",
      name: "Nagad",
      provider: "nagad",
      number: "+880 1812-345678",
      icon: Phone,
      color: "bg-orange-500",
    },
    {
      id: "card1",
      type: "card",
      name: "Visa Card",
      last4: "4532",
      cardholderName: "Sarah Johnson",
      expiryDate: "12/26",
      icon: CreditCard,
      color: "bg-blue-600",
    },
  ]);

  const [currentRide] = useState({
    id: "RIDE-2025-001",
    driver: {
      name: "Ahmed Rahman",
      rating: 4.8,
      phone: "+880 1712-345678",
      photo: "/api/placeholder/40/40",
    },
    route: {
      from: "Dhanmondi 27",
      to: "University of Dhaka",
      distance: "8.5 km",
      duration: "25 mins",
    },
    fare: {
      base: 150,
      distance: 85,
      time: 40,
      serviceFee: 25,
      total: 300,
    },
    status: "completed",
    completedAt: "2025-01-15 14:30",
  });

  const tabs = [
    { id: "current", label: "Current Ride", icon: Car },
    { id: "history", label: "Payment History", icon: Calendar },
    { id: "methods", label: "Payment Methods", icon: CreditCard },
  ];

  const mobileProviders = [
    { id: "bkash", name: "bKash", color: "bg-pink-500" },
    { id: "nagad", name: "Nagad", color: "bg-orange-500" },
    { id: "rocket", name: "Rocket", color: "bg-purple-500" },
    { id: "upay", name: "Upay", color: "bg-green-500" },
  ];

  const recentRides = [
    {
      id: "RIDE-2025-002",
      driver: "Sarah Khan",
      route: "Gulshan 1 → Dhanmondi",
      amount: 250,
      date: "2025-01-14",
      status: "paid",
      method: "bKash",
    },
    {
      id: "RIDE-2025-003",
      driver: "Mike Rahman",
      route: "BUET → Shahbag",
      amount: 180,
      date: "2025-01-13",
      status: "paid",
      method: "Wallet",
    },
    {
      id: "RIDE-2025-004",
      driver: "Fatima Ahmed",
      route: "Uttara → DU Campus",
      amount: 350,
      date: "2025-01-12",
      status: "paid",
      method: "Nagad",
    },
  ];

  // Helper functions
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Event handlers
  const handlePayment = () => {
    const totalAmount = currentRide.fare.total + tipAmount;
    const selectedMethod = paymentMethods.find(
      (m) => m.id === selectedPaymentMethod
    );

    if (selectedMethod?.type === "cash") {
      alert(
        `Cash payment of ৳${totalAmount} confirmed! Please pay the driver directly.`
      );
      return;
    }

    setShowPaymentModal(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      alert(`Payment of ৳${totalAmount} successful! Driver has been notified.`);
    }, 2000);
  };

  const handleAddPaymentMethod = () => {
    if (addPaymentType === "mobile") {
      if (!newPayment.phoneNumber || !newPayment.provider) {
        alert("Please fill in all mobile payment fields");
        return;
      }
      const newMethod = {
        id: `mobile_${Date.now()}`,
        type: "mobile",
        name: mobileProviders.find((p) => p.id === newPayment.provider)?.name,
        provider: newPayment.provider,
        number: newPayment.phoneNumber,
        icon: Phone,
        color: mobileProviders.find((p) => p.id === newPayment.provider)?.color,
      };
      setPaymentMethods([...paymentMethods, newMethod]);
    } else if (addPaymentType === "card") {
      if (
        !newPayment.cardNumber ||
        !newPayment.expiryDate ||
        !newPayment.cvv ||
        !newPayment.cardholderName
      ) {
        alert("Please fill in all card fields");
        return;
      }
      const newMethod = {
        id: `card_${Date.now()}`,
        type: "card",
        name: "Credit Card",
        last4: newPayment.cardNumber.slice(-4),
        cardholderName: newPayment.cardholderName,
        expiryDate: newPayment.expiryDate,
        icon: CreditCard,
        color: "bg-blue-600",
      };
      setPaymentMethods([...paymentMethods, newMethod]);
    }

    setNewPayment({
      phoneNumber: "",
      provider: "bkash",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    });
    setShowAddPaymentModal(false);
  };

  const handleEditPaymentMethod = (method) => {
    setEditingMethod(method);
    if (method.type === "mobile") {
      setNewPayment({
        phoneNumber: method.number,
        provider: method.provider,
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
      });
      setAddPaymentType("mobile");
    } else if (method.type === "card") {
      setNewPayment({
        phoneNumber: "",
        provider: "bkash",
        cardNumber: "**** **** **** " + method.last4,
        expiryDate: method.expiryDate,
        cvv: "***",
        cardholderName: method.cardholderName,
      });
      setAddPaymentType("card");
    }
    setShowAddPaymentModal(true);
  };

  const handleUpdatePaymentMethod = () => {
    if (!editingMethod) return;

    const updatedMethods = paymentMethods.map((method) => {
      if (method.id === editingMethod.id) {
        if (addPaymentType === "mobile") {
          return {
            ...method,
            name: mobileProviders.find((p) => p.id === newPayment.provider)
              ?.name,
            provider: newPayment.provider,
            number: newPayment.phoneNumber,
            color: mobileProviders.find((p) => p.id === newPayment.provider)
              ?.color,
          };
        } else if (addPaymentType === "card") {
          return {
            ...method,
            cardholderName: newPayment.cardholderName,
            expiryDate: newPayment.expiryDate,
          };
        }
      }
      return method;
    });

    setPaymentMethods(updatedMethods);
    setEditingMethod(null);
    setNewPayment({
      phoneNumber: "",
      provider: "bkash",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    });
    setShowAddPaymentModal(false);
  };

  const handleDeletePaymentMethod = (methodId) => {
    const method = paymentMethods.find((m) => m.id === methodId);
    if (method && (method.type === "wallet" || method.type === "cash")) {
      alert("Cannot delete default payment methods");
      return;
    }
    if (confirm("Are you sure you want to delete this payment method?")) {
      setPaymentMethods(
        paymentMethods.filter((method) => method.id !== methodId)
      );
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#EBF5F5" }}
    >
      {/* Header */}
      <CampusRideHeader />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button className="flex items-center gap-2 text-gray-600 mb-6 transition-colors hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to My Rides</span>
            </button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Ride Payment
              </h1>
              <p className="text-gray-600">
                Pay your driver securely via SSL Commerz
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div
            style={{ backgroundColor: "#D7E5E5" }}
            className="rounded-xl border border-gray-300 shadow-sm mb-8"
          >
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-5 font-medium text-sm transition-all border-b-3 ${
                      activeTab === tab.id
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-600"
                    }`}
                    style={
                      activeTab === tab.id ? { backgroundColor: "#EBF5F5" } : {}
                    }
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modals */}
          <PaymentModals
            showPaymentModal={showPaymentModal}
            showAddPaymentModal={showAddPaymentModal}
            showAddMoneyModal={showAddMoneyModal}
            showWithdrawModal={showWithdrawModal}
            setShowPaymentModal={setShowPaymentModal}
            setShowAddPaymentModal={setShowAddPaymentModal}
            setShowAddMoneyModal={setShowAddMoneyModal}
            setShowWithdrawModal={setShowWithdrawModal}
            addPaymentType={addPaymentType}
            setAddPaymentType={setAddPaymentType}
            editingMethod={editingMethod}
            setEditingMethod={setEditingMethod}
            newPayment={newPayment}
            setNewPayment={setNewPayment}
            mobileProviders={mobileProviders}
            handleAddPaymentMethod={handleAddPaymentMethod}
            handleUpdatePaymentMethod={handleUpdatePaymentMethod}
            formatCardNumber={formatCardNumber}
          />

          {/* Current Ride Tab */}
          {activeTab === "current" && (
            <div className="space-y-8">
              {/* Ride Details */}
              <RideDetailsCard
                currentRide={currentRide}
                tipAmount={tipAmount}
              />

              {/* Fare Breakdown and Tip */}
              <FareBreakdown
                currentRide={currentRide}
                tipAmount={tipAmount}
                setTipAmount={setTipAmount}
              />

              {/* Payment Method Selection */}
              <PaymentMethodSelection
                paymentMethods={paymentMethods}
                selectedPaymentMethod={selectedPaymentMethod}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
                totalAmount={currentRide.fare.total + tipAmount}
                onPayment={handlePayment}
              />
            </div>
          )}

          {/* Payment History Tab */}
          {activeTab === "history" && (
            <PaymentHistory recentRides={recentRides} />
          )}

          {/* Payment Methods Tab */}
          {activeTab === "methods" && (
            <PaymentMethodsManagement
              paymentMethods={paymentMethods}
              onAddNew={() => setShowAddPaymentModal(true)}
              onEdit={handleEditPaymentMethod}
              onDelete={handleDeletePaymentMethod}
              onAddMoney={() => setShowAddMoneyModal(true)}
              onWithdraw={() => setShowWithdrawModal(true)}
            />
          )}
        </div>
      </div>
      <CampusRideFooter />
    </div>
  );
}
