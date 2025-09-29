import { TIER } from "./type";

export const checkTier = (tier: TIER, allowParent: boolean = false, allowStudent: boolean = false) => {
    if(tier === TIER.ADMIN) return true;
    if(allowParent) return tier === TIER.PARENT;
    if(allowStudent) return tier === TIER.STUDENT;
    
    return false;
}