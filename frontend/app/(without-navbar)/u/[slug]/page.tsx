import { Username } from "@/components/ui/contextFetch/username";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return (
        <div className="flex flex-row h-screen w-full items-center justify-center text-2xl text-white font-aleo glow-shadow">
            <p className="mr-1">This is</p>
            <Username className="font-bold font-sora text-teal-500 mb-[2px]" />
            &apos;s Personal Home :3
        </div>
    );
}
