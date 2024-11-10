import { DynamicField } from "../common/components/DynamicField/DynamicField"
import { useState } from "react"
import { StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"

export default {
    component: DynamicField,
}

type Story = StoryObj<typeof DynamicField>

const callback = action("current action")

export const FirstStory: Story = {
    args: {
        currentTitle: "title",
        setValue: callback,
    },
}

export const EditState = () => {
    const [title, setTitle] = useState<string>("title")

    return <DynamicField currentTitle={title} setValue={setTitle} />
}
