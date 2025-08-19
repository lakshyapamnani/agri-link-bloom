import { useState } from "react";
import type React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface AuthDialogProps {
	trigger?: React.ReactNode;
}

export const AuthDialog = ({ trigger }: AuthDialogProps) => {
	const [open, setOpen] = useState(false);
	const [mode, setMode] = useState<"login" | "signup">("login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setError(null);
		try {
			if (mode === "login") {
				await signInWithEmailAndPassword(auth, email.trim(), password);
			} else {
				const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
				if (displayName.trim()) {
					await updateProfile(cred.user, { displayName: displayName.trim() });
				}
				// Write user profile in background to avoid blocking UI
				void setDoc(doc(db, "users", cred.user.uid), {
					uid: cred.user.uid,
					email: cred.user.email,
					displayName: (cred.user.displayName ?? displayName.trim()) || null,
					createdAt: serverTimestamp(),
					role: "consumer"
				}, { merge: true }).catch((err) => {
					console.error("Failed to save user profile:", err);
				});
			}
			// Close dialog and reset fields on success
			setOpen(false);
			setMode("login");
			setEmail("");
			setPassword("");
			setDisplayName("");
		} catch (err: any) {
			const message = err?.message || String(err) || "Authentication failed";
			setError(message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger ?? <Button variant="outline">Login</Button>}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{mode === "login" ? "Login" : "Create account"}</DialogTitle>
				</DialogHeader>
				<form className="space-y-4" onSubmit={handleSubmit}>
					{mode === "signup" && (
						<div className="space-y-2">
							<Label htmlFor="displayName">Name</Label>
							<Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
						</div>
					)}
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
					</div>
					{error && <p className="text-sm text-red-500">{error}</p>}
					<div className="flex items-center justify-between">
						<Button type="submit" disabled={submitting} className="btn-hero">
							{mode === "login" ? (submitting ? "Logging in..." : "Login") : (submitting ? "Creating..." : "Sign up")}
						</Button>
						<Button type="button" variant="ghost" onClick={() => setMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Create account" : "Have an account? Login"}</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export const LogoutButton = () => {
	const [loading, setLoading] = useState(false);
	return (
		<Button variant="outline" onClick={async () => {
			setLoading(true);
			try { await signOut(auth); } finally { setLoading(false); }
		}}>{loading ? "Logging out..." : "Logout"}</Button>
	);
};


