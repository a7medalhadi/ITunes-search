type Props = {
    text : string
}
export const LoadingSkeleton = ({text} : Props) => {
  return (
    <div className="text-center py-24 space-y-6">
      <div className="w-16 h-16 mx-auto border-4 border-border border-t-primary rounded-full animate-spin" />
      <p className="text-lg text-muted-foreground">{text}</p>
    </div>
  );
}