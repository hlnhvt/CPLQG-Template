import * as Lucide from 'lucide-react';

const iconsToCheck = ['Flame', 'Clock', 'HelpCircle', 'FileText', 'CheckCircle2', 'User', 'Eye', 'ThumbsUp', 'PlusCircle', 'MessageCircle', 'ChevronRight', 'Coins', 'MapPin', 'Briefcase', 'Scale', 'Calendar', 'Check', 'ArrowLeft', 'MoreHorizontal', 'LayoutGrid'];

iconsToCheck.forEach(iconName => {
    if (Lucide[iconName]) {
        console.log(`Icon ${iconName} is valid.`);
    } else {
        console.error(`Icon ${iconName} is UNDEFINED!`);
    }
});
