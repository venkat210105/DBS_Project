package com.dbs.dto;

import java.util.List;
import java.util.Map;

public class DashboardResponse {
    private Map<String, Long> sentimentCounts;
    private List<TrendData> trends;
    private List<RecentFeedback> recentFeedback;

    public Map<String, Long> getSentimentCounts() {
        return sentimentCounts;
    }

    public void setSentimentCounts(Map<String, Long> sentimentCounts) {
        this.sentimentCounts = sentimentCounts;
    }

    public List<TrendData> getTrends() {
        return trends;
    }

    public void setTrends(List<TrendData> trends) {
        this.trends = trends;
    }

    public List<RecentFeedback> getRecentFeedback() {
        return recentFeedback;
    }

    public void setRecentFeedback(List<RecentFeedback> recentFeedback) {
        this.recentFeedback = recentFeedback;
    }

    public static class TrendData {
        private String date;
        private Long count;

        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }

        public Long getCount() { return count; }
        public void setCount(Long count) { this.count = count; }
    }

    public static class RecentFeedback {
        private Long id;
        private String comment;
        private String label;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getComment() { return comment; }
        public void setComment(String comment) { this.comment = comment; }

        public String getLabel() { return label; }
        public void setLabel(String label) { this.label = label; }
    }
}
