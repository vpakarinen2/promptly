PROMPT_TEMPLATES = {
    "text": {
        "blog_post": [
            "Write an engaging blog post about {subject}. Start with a compelling hook and use a {tone} tone. Include {details}.",
            "Create a listicle-style blog post on the topic of {subject}. The tone should be {tone}. Make sure to cover {details}.",
            "Compose a detailed 'how-to' guide on {subject}. The tone should be helpful and {tone}. Break it down into easy steps and mention {details}.",
            "Write a persuasive opinion piece on {subject}. Use a {tone} and convincing tone, supported by {details}.",
        ],
    },
    "image": {
        "photorealistic": [
            "A hyperrealistic, 8K photo of {subject}, {details}, cinematic lighting, sharp focus.",
            "Ultra-detailed photograph of {subject}, {details}, professional color grading, shot on a DSLR.",
            "RAW photo of {subject}, {details}, natural lighting, photorealistic, 85mm lens.",
            "Close-up portrait of {subject}, {details}, incredibly detailed, tack sharp, high resolution.",
            "National Geographic style photo of {subject}, {details}, award-winning photography.",
        ],
        "anime": [
            "A vibrant anime artwork of {subject}, {details}, Studio Ghibli inspired.",
            "90s anime style screenshot of {subject}, {details}, cel shading, retro aesthetic.",
            "Epic anime key visual of {subject}, {details}, dynamic pose, beautiful scenery.",
            "Modern anime poster of {subject}, {details}, clean line art, vibrant colors, trending on Pixiv.",
            "Chibi anime character of {subject}, {details}, cute and adorable, simple background.",
        ],
        "fantasy_art": [
            "Epic fantasy digital painting of {subject}, {details}, by Greg Rutkowski, trending on ArtStation.",
            "A mythical {subject} in a magical forest, {details}, glowing runes, ethereal light.",
            "Concept art of a fantasy character, {subject}, {details}, intricate armor design, cinematic.",
            "Dark fantasy illustration of {subject}, {details}, moody atmosphere, by Brom.",
            "High fantasy book cover art of {subject}, {details}, detailed environment.",
        ],
    },
    "video": {
        "cinematic_shot": [
            "Cinematic 4K shot of {subject}, {details}, slow motion, shallow depth of field.",
            "An epic tracking shot following {subject}, {details}, anamorphic lens flare.",
            "A dramatic drone shot over {subject}, {details}, golden hour, breathtaking landscape.",
            "Handheld documentary-style footage of {subject}, {details}, gritty and realistic.",
            "Wes Anderson style symmetrical shot of {subject}, {details}, pastel color palette.",
        ],
    },
}

TEMPLATE_FILLERS = {
    "subject": ["a lone astronaut", "a futuristic city", "a hidden waterfall", "a majestic lion", "a cyberpunk ninja", "an ancient library", "a bustling market"],
    "details": ["at dusk", "covered in neon lights", "with glowing mushrooms", "in the Serengeti", "on a rainy night", "filled with forgotten books", "with exotic spices"],
    "tone": ["informative", "witty", "formal", "casual", "inspirational", "humorous", "serious"]
}
