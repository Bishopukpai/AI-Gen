import BgRemove from "./bg-remove";
import BackgroundReplace from "./bg-replace";
import ExtractPart from "./extract-parts";
import GenRemove from "./gen-remove";
import GenerativeFill from "./generative-fill";

export default function ImageTools() {
    return (
        <div className="flex flex-col p-5 gap-5">
            <GenRemove />
            <BgRemove />
            <BackgroundReplace />
            <GenerativeFill />
            <ExtractPart />
        </div>
    )
}