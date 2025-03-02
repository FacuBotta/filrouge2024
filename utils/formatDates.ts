const formatDate = (dateString: Date | string) => {
  return new Date(dateString).toLocaleDateString('fr', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
  });
};

export default formatDate;
